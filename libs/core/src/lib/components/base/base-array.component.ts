import { AbstractControl } from '@angular/forms';
import { Question, QuestionProperties } from '../../model';
import { FastFormArray } from '../../control/fast-form-array';

export abstract class BaseFormArrayComponent<T = QuestionProperties, C = AbstractControl> {
  formArray!: FastFormArray;
  question!: Question;
  properties!: T;
}
