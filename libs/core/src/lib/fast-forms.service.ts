import { Injectable } from '@angular/core';
import { Question } from "./model";
import { FastFormsGroup } from "./fast-forms-group";
import { FormControlFactoryService } from './control/form-control-factory.service';
import { ValidatorFactoryService } from "./validation/validator-factory.service";

@Injectable()
export class FastFormsService {

  constructor(private controlFactory: FormControlFactoryService,
              private validatorFactory: ValidatorFactoryService) {
  }

  public createDynamicForm(questions: Array<Question>): FastFormsGroup {
    return new FastFormsGroup(questions, this.controlFactory, this.validatorFactory);
  }
}
