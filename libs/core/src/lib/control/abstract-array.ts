import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Question, QuestionProperties } from '../model';
import { FastFormArray } from './fast-form-array';

export abstract class FastFormArrayAsdf<T = QuestionProperties, C = AbstractControl> {
  formGroup!: FormGroup;
  formArray!: FastFormArray;
  formArrayName!: string | number;
  // control!: C;
  question!: Question;
  properties!: T;
}
