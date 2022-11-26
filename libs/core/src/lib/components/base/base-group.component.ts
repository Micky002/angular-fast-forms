import { FormGroup } from '@angular/forms';
import { Question, QuestionProperties } from '../../model';

/**
 * @deprecated Will be removed in version [3.0.0]. Use dependency
 * injection pattern instead.
 */
export abstract class BaseFormGroupComponent<T = QuestionProperties> {
  formGroup!: FormGroup;
  questions!: Array<Question>;
  properties!: T;
}
