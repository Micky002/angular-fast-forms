import { AbstractControl, FormGroup } from '@angular/forms';
import { Question, QuestionProperties } from '../model';

export abstract class FastFormControlComponent<T = QuestionProperties, C = AbstractControl> {
  formGroup!: FormGroup;
  formControlName!: string;
  control!: C;
  question!: Question;
  properties!: T;
}
