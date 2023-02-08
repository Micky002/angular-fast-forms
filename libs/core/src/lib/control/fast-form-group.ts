import { AbstractControl, AbstractControlOptions, FormRecord } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';
import { ActionEvent } from '../actions/models';
import { isAction } from '../internal/action/action.util';

export class FastFormGroup extends FormRecord {

  public readonly questionChanges: Observable<Array<Question>>;
  public actionEvents: Observable<ActionEvent>;
  public index: number | null = null;
  public question: Question;
  public readonly actions: { [key: string]: AbstractControl } = {};

  private _questionChanges$ = new Subject<Array<Question>>();
  private _actions$ = new Subject<ActionEvent>();

  constructor(question: Question | null,
              private controlFactory: ControlFactoryService,
              options?: AbstractControlOptions) {
    super({}, options);
    this.question = question ?? {id: 'group-parent', type: 'group', children: []};
    this.validateQuestions(question?.children ?? []);
    this.questionChanges = this._questionChanges$.asObservable();
    this.createChildControls();
    this.actionEvents = this._actions$.asObservable();
  }


  public get questions(): Array<Question> {
    return this.question.children || [];
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
    this.question.children = questions;
    this.controls = {};
    this.createChildControls();
    this._questionChanges$.next(questions);
  }

  override addControl(name: string, control: AbstractControl, options?: { emitEvent?: boolean | undefined; } | undefined): void {
    if (isAction(control)) {
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
