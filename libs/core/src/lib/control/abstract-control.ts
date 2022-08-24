import { AbstractControl, FormGroup } from "@angular/forms";
import { Question, QuestionProperties, ValidationOptions } from '../model';

export abstract class FastFormControl {
  formGroup!: FormGroup;
  control!: AbstractControl;
  question!: Question;

  public get validation(): ValidationOptions | undefined {
    return this.question.validation;
  }

  protected get baseProperties(): QuestionProperties {
    return this.question?.properties || {};
  }
}
