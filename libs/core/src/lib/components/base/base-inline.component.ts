import { FormGroup } from '@angular/forms';
import { Question } from '../../model';

export abstract class BaseFormInlineComponent {
  formGroup!: FormGroup;
  questions!: Array<Question>;
}
