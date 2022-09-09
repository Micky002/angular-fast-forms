import { FormGroup } from '@angular/forms';
import { Question, QuestionProperties } from '../../model';

export abstract class BaseFormGroupComponent<T = QuestionProperties> {
  formGroup!: FormGroup;
  questions!: Array<Question>;
  properties!: T;
}
