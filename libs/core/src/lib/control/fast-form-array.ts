import { FormArray } from '@angular/forms';
import { Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';
import { Subject } from 'rxjs';

export class FastFormArray extends FormArray {

  private _render$ = new Subject<any>();
  public renderChanged = this._render$.asObservable();
  // public readonly questionChanges: Observable<Array<Question>>;
  // private _questions: Array<Question>;
  // private _questionChanges$ = new Subject<Array<Question>>();

  constructor(private question: Question,
              private controlFactory: ControlFactoryService) {
    super([]);

    // this.controlFactory.createFromQuestion(this, question);


    // this.questionChanges = this._questionChanges$.asObservable();
    // const ids = new Set();
    // questions.forEach(q => {
    //   if (ids.has(q.id)) {
    //     throw new Error(`Duplicated form control id ${q.id} found.`);
    //   }
    //   ids.add(q.id);
    // });
    // this._questions = questions;
    // this.toDefinition();
  }

  override setValue(value: any, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    this._render$.next(null);
    // console.log('value: ', value);
    this.clear();
    if (value instanceof Array) {
      for (let i = 0; i < value.length; i++) {
        // console.log(`create array control ${i}: `, this.question);
        // this.question.id = '' + i
        this.controlFactory.createFromQuestion(this, this.question);
        // this.push();
      }
    } else {
      // TODO error handling
    }
    super.setValue(value, options);
  }

  // private renderAsdf!: () => void;

  // register(param: () => void) {
  //
  // }
}
