import { Injectable, Optional } from '@angular/core';
import { Question } from '../model';
import { FastFormGroup } from '../control/fast-form-group';
import { ControlFactoryService } from './control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { UiRegistryService } from './ui-registry.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControlOptions } from "@angular/forms";

@Injectable({
  providedIn: 'any'
})
export class FastFormsService {

  constructor(private controlFactory: ControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              private uiRegistry: UiRegistryService,
              @Optional() private http?: HttpClient) {
  }

  public createDynamicForm(questions: Array<Question>, options?: AbstractControlOptions): FastFormGroup {
    return new FastFormGroup(questions, this.controlFactory, options);
  }

  public createHttpForm(endpoint: string): FastFormGroup {
    if (!this.http) {
      throw new Error(`No HttpClient found. Register [HttpClientModule] in your app.`);
    }
    const formGroup = new FastFormGroup([], this.controlFactory);
    this.http.get<Array<Question>>(endpoint)
      .subscribe(questions => formGroup.setQuestions(questions));
    return formGroup
  }
}
