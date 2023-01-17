import { Injectable, Optional } from '@angular/core';
import { GroupOptions, Question, SingleQuestion } from '../model';
import { FastFormGroup } from '../control/fast-form-group';
import { ControlFactoryService } from './control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { FormRenderService } from '../internal/form-render.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControlOptions } from '@angular/forms';
import { FastFormControl } from '../control';

@Injectable({
  providedIn: 'any'
})
export class FastFormsService {

  public static readonly ROOT_GROUP_ID = 'root-group-id';

  constructor(private controlFactory: ControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              private uiRegistry: FormRenderService,
              @Optional() private http?: HttpClient) {
  }

  public createSingleControl(question: SingleQuestion): FastFormControl {
    return new FastFormControl(question, question.defaultValue);
  }

  public createGroup(questions: Array<Question> = [], options?: GroupOptions): FastFormGroup {
    const groupQuestion: Question = {
      id: FastFormsService.ROOT_GROUP_ID,
      type: options?.type ?? 'group',
      children: questions ?? []
    };
    return new FastFormGroup(groupQuestion, this.controlFactory, {
      validators: options?.validators,
      asyncValidators: options?.asyncValidators,
      updateOn: options?.updateOn
    });
  }

  public createDynamicForm(questions: Array<Question>, options?: AbstractControlOptions): FastFormGroup {
    return new FastFormGroup({
      id: FastFormsService.ROOT_GROUP_ID,
      type: 'group',
      children: questions
    }, this.controlFactory, options);
  }

  public createHttpForm(endpoint: string): FastFormGroup {
    if (!this.http) {
      throw new Error(`No HttpClient found. Register [HttpClientModule] in your app.`);
    }
    const formGroup = new FastFormGroup({
      id: FastFormsService.ROOT_GROUP_ID,
      type: 'group'
    }, this.controlFactory);
    this.http.get<Array<Question>>(endpoint)
        .subscribe(questions => formGroup.setQuestions(questions));
    return formGroup;
  }
}
