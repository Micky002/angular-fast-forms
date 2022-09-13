import { FormGroup } from '@angular/forms';
import { Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';
import { Observable, Subject } from 'rxjs';

export class FastFormGroup extends FormGroup {
  public readonly questionChanges: Observable<Array<Question>>;
  private _questions: Array<Question>;
  private _questionChanges$ = new Subject<Array<Question>>();

  constructor(questions: Array<Question>,
              private controlFactory: ControlFactoryService) {
    super({})
    this.questionChanges = this._questionChanges$.asObservable();
    const ids = new Set();
    questions.forEach(q => {
      if (ids.has(q.id)) {
        throw new Error(`Duplicated form control id ${q.id} found.`);
      }
      ids.add(q.id);
    });
    this._questions = questions;
    this.toDefinition();
  }

  public get questions(): Array<Question> {
    return this._questions || [];
  }

  private toDefinition() {
    this.controlFactory.createFromQuestions(this, this._questions);
  }

  setQuestions(questions: Array<Question>) {
    this._questions = questions;
    this.controls = {};
    this.toDefinition();
    this._questionChanges$.next(questions);
  }
}
