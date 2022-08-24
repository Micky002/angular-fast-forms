import { AbstractControl, FormGroup } from "@angular/forms";
import { Question, QuestionProperties, ValidationOptions } from '../model';

export abstract class FastFormInline {
  formGroup!: FormGroup;
  // control!: AbstractControl;
  questions!: Array<Question>;

  // public get validation(): ValidationOptions | undefined {
  //   return this.question.validation;
  // }

  // protected get baseProperties(): QuestionProperties {
  //   return this.question?.properties || {};
  // }
}
