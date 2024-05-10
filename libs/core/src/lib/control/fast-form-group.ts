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

  private _questions: Array<Question>;

  public get questions(): Array<Question> {
    return this._questions || [];
  }

  private get mergedControls() {
    return {
      ...this.actions,
      ...this.controls,
    };
  }

  constructor(questions: Array<Question>,
              private controlFactory: ControlFactoryService,
              options?: AbstractControlOptions) {
    super({}, options);
    this.validateQuestions(questions);
    this.questionChanges = this._questionChanges$.asObservable();
    this._questions = questions;
    this.createChildControls();
    this.actionEvents = this._actions$.asObservable();
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
    this._questions = questions;
    this.controls = {};
    this.createChildControls();
    this._questionChanges$.next(questions);
  }

  override addControl(name: string, control: AbstractControl, options?: {
    emitEvent?: boolean | undefined;
  } | undefined): void {
    if (control instanceof FromActionControlInternal || control instanceof FormActionGroupInternal) {
      this.actions[name] = control;
    } else {
      super.addControl(name, control, options);
    }
  }

  private createChildControls() {
    this.controlFactory.createFromQuestions(this, this._questions);
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
