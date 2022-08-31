import { Question, QuestionProperties } from '../../model';
import { FastFormArray } from '../../control/fast-form-array';

export abstract class BaseFormArrayComponent<T = QuestionProperties> {
  formArray!: FastFormArray;
  question!: Question;
  properties!: T;
}
