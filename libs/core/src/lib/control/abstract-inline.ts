import { FormGroup } from '@angular/forms';
import { Question } from '../model';

export abstract class FastFormInline {
  formGroup!: FormGroup;
  questions!: Array<Question>;
}
