import { Injectable } from '@angular/core';
import { Question } from "../model";
import { FastFormsGroup } from "../control/fast-forms-group";
import { FormControlFactoryService } from './form-control-factory.service';
import { ValidatorFactoryService } from "../validation/validator-factory.service";
import { UiRegistryService } from './ui-registry.service';

@Injectable()
export class FastFormsService {

  constructor(private controlFactory: FormControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              private uiRegistry: UiRegistryService) {
  }

  public createDynamicForm(questions: Array<Question>): FastFormsGroup {
    return new FastFormsGroup(questions, this.controlFactory, this.validatorFactory, this.uiRegistry);
  }
}
