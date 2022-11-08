import { AbstractControl, FormGroup } from '@angular/forms';
import { Question } from '../../model';
import { QuestionProperties } from '../../question.properties';

export abstract class BaseFormControlComponent<T = QuestionProperties, C = AbstractControl> {
  formGroup!: FormGroup;
  control!: C;
  question!: Question;
  properties!: T;
}
