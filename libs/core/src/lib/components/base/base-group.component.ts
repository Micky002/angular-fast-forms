import { FormGroup } from '@angular/forms';
import { Question } from '../../model';
import { QuestionProperties } from '../../question.properties';

export abstract class BaseFormGroupComponent<T = QuestionProperties> {
  formGroup!: FormGroup;
  questions!: Array<Question>;
  properties!: T;
}
