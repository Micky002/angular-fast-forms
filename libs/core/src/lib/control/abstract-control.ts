import { AbstractControl, FormGroup } from "@angular/forms";
import { Question, QuestionProperties, ValidationOptions } from '../model';

export abstract class FastFormControl<T = QuestionProperties> {
  formGroup!: FormGroup;
  control!: AbstractControl;
  question!: Question;

  public get validation(): ValidationOptions | undefined {
    return this.question.validation;
  }

  protected get properties(): T {
    return (this.question?.properties || {}) as unknown as T;
  }
}
