import { FormControl, FormControlOptions } from '@angular/forms';
import { SingleQuestion } from '../model';

export class FastFormControl extends FormControl {

  public index: number | null = null;
  public question?: SingleQuestion;

  constructor(value?: unknown, opts?: FormControlOptions & { question: SingleQuestion }) {
    super(value, opts);
    this.question = opts?.question;
  }
}
