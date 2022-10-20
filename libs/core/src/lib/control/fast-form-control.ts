import { FormControl } from '@angular/forms';
import { Question } from '../model';

export class FastFormControl extends FormControl {

  public index: number | null = null;

  constructor(public question: Question, value?: unknown) {
    super(value);
  }
}
