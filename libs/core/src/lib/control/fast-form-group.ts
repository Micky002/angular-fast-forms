import { AbstractControlOptions, FormGroup } from '@angular/forms';
import { Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';
import { Observable, Subject } from 'rxjs';
import { ActionEvent } from '../actions/models';

export class FastFormGroup extends FormGroup {
  public readonly questionChanges: Observable<Array<Question>>;
  public actionEvents: Observable<ActionEvent>;
  public index: number | null = null;
  private _questionChanges$ = new Subject<Array<Question>>();
  private _actions$ = new Subject<ActionEvent>();

  constructor(questions: Array<Question>,
              private controlFactory: ControlFactoryService,
              options?: AbstractControlOptions) {
    super({}, options);
    this.validateQuestions(questions);
    this.questionChanges = this._questionChanges$.asObservable();
    this._questions = questions;
    this.createFormControls();
    this.actionEvents = this._actions$.asObservable();
  }

  private _questions: Array<Question>;

  public get questions(): Array<Question> {
    return this._questions || [];
  }

  setQuestions(questions: Array<Question>) {
    this._questions = questions;
    this.controls = {};
    this.createFormControls();
    this._questionChanges$.next(questions);
  }

  private createFormControls() {
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
