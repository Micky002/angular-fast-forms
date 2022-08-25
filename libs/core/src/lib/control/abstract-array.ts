import { AbstractControl, FormArray } from '@angular/forms';
import { Question, QuestionProperties } from '../model';

export abstract class FastFormArray<T = QuestionProperties, C = AbstractControl> {
  formArray!: FormArray;
  control!: C;
  question!: Question;
  properties!: T;
}
