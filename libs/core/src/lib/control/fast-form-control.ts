import { FormControl } from '@angular/forms';
import { Question, SingleQuestion } from '../model';

export class FastFormControl extends FormControl {

  public index: number | null = null;

  constructor(public question: SingleQuestion | Question, value?: unknown) {
    super(value);
  }
}
