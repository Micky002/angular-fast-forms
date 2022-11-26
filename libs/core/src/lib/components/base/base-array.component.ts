import { Question, QuestionProperties } from '../../model';
import { FastFormArray } from '../../control/fast-form-array';

/**
 * @deprecated Will be removed in version [3.0.0]. Use dependency
 * injection pattern instead.
 */
export abstract class BaseFormArrayComponent<T = QuestionProperties> {
  formArray!: FastFormArray;
  question!: Question;
  properties!: T;
}
