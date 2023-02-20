import { FormGroup } from '@angular/forms';
import { Question } from '../../model';

/**
 * @deprecated Will be removed in version [3.0.0]. Use dependency
 * injection pattern instead.
 */
export abstract class BaseFormGroupComponent<T = unknown> {
  formGroup!: FormGroup;
  questions!: Array<Question>;
  properties!: T;
}
