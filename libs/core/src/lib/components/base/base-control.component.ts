import { AbstractControl, FormGroup } from '@angular/forms';
import { Question, QuestionProperties } from '../../model';

export abstract class BaseFormControlComponent<T = QuestionProperties, C = AbstractControl> {
  formGroup!: FormGroup;
  control!: C;
  question!: Question;
  properties!: T;
}
