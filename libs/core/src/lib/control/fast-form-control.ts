import { FormControl } from '@angular/forms';
import { Question } from '../model';

export class FastFormControl extends FormControl {

  constructor(public question: Question, value?: unknown) {
    super(value);
  }
}
