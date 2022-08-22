import { Injectable } from '@angular/core';
import { Question } from "./model";
import { DynamicFormGroup } from "./dynamic-form-group";
import { FormControlFactoryService } from './control/form-control-factory.service';
import { ValidatorFactoryService } from "./validation/validator-factory.service";

@Injectable()
export class DynamicFormService {

  constructor(private controlFactory: FormControlFactoryService,
              private validatorFactory: ValidatorFactoryService) {
  }

  public createDynamicForm(questions: Array<Question>): DynamicFormGroup {
    return new DynamicFormGroup(questions, this.controlFactory, this.validatorFactory);
  }
}
