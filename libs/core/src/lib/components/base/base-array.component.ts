import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Question, QuestionProperties } from '../../model';
import { FastFormArray } from '../../control/fast-form-array';

export abstract class BaseFormArrayComponent<T = QuestionProperties, C = AbstractControl> {
  formGroup!: FormGroup;
  formArray!: FastFormArray;
  formArrayName!: string | number;
  // control!: C;
  question!: Question;
  properties!: T;
}
