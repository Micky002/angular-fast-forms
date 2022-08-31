import { FormGroup } from '@angular/forms';
import { Question } from '../../model';

export abstract class BaseFormGroupComponent {
  formGroup!: FormGroup;
  questions!: Array<Question>;
}
