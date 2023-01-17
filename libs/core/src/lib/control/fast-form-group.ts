import { AbstractControl, AbstractControlOptions, FormGroup } from '@angular/forms';
import { Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';
import { Observable, Subject } from 'rxjs';
import { ActionEvent } from '../actions/models';
import { FromActionControlInternal } from '../internal/action/action-control-internal';
import { FormActionGroupInternal } from '../internal/action/action-group-internal';

export class FastFormGroup extends FormGroup {

  public readonly questionChanges: Observable<Array<Question>>;
  public actionEvents: Observable<ActionEvent>;
  public index: number | null = null;
  public readonly actions: { [key: string]: FromActionControlInternal | FormActionGroupInternal } = {};

  private _questionChanges$ = new Subject<Array<Question>>();
  private _actions$ = new Subject<ActionEvent>();
  private _question: Question;

  constructor(question: Question | null,
              private controlFactory: ControlFactoryService,
              options?: AbstractControlOptions) {
    super({}, options);
    this._question = question ?? {id: 'group-parent', type: 'group', children: []};
    this.validateQuestions(question?.children ?? []);
    this.questionChanges = this._questionChanges$.asObservable();
    this.createChildControls();
    this.actionEvents = this._actions$.asObservable();
  }


  public get questions(): Array<Question> {
    return this._question.children || [];
  }

  private get mergedControls() {
    return {
      ...this.actions,
      ...this.controls
    };
  }

  override get(path: string): AbstractControl | null {
    const pathParts = path.split('.');
    const firstPath = pathParts.shift();
    if (firstPath === undefined) {
      return null;
    }
    if (pathParts.length === 0) {
      return this.mergedControls[firstPath] ?? null;
    } else {
      return this.mergedControls[firstPath]?.get(pathParts.join('.')) ?? null;
    }
  }

  public setQuestions(questions: Array<Question>) {
    this._question.children = questions;
    this.controls = {};
    this.createChildControls();
    this._questionChanges$.next(questions);
  }

  override addControl(name: string, control: AbstractControl, options?: { emitEvent?: boolean | undefined; } | undefined): void {
    if (control instanceof FromActionControlInternal || control instanceof FormActionGroupInternal) {
      this.actions[name] = control;
    } else {
      super.addControl(name, control, options);
    }
  }

  private createChildControls() {
    this.controlFactory.createFromQuestions(this, this.questions);
  }

  private validateQuestions(questions: Question[]) {
    const ids = new Set();
    questions.forEach(q => {
      if (ids.has(q.id)) {
        throw new Error(`Duplicated form control id ${q.id} found.`);
      }
      ids.add(q.id);
    });
  }
}
