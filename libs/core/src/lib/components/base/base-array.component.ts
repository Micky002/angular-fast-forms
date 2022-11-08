import { Question } from '../../model';
import { FastFormArray } from '../../control/fast-form-array';
import { QuestionProperties } from '../../question.properties';

export abstract class BaseFormArrayComponent<T = QuestionProperties> {
  formArray!: FastFormArray;
  question!: Question;
  properties!: T;
}
