import { Injectable, Optional } from '@angular/core';
import { Question } from '../model';
import { FastFormGroup } from '../control/fast-form-group';
import { ControlFactoryService } from './control-factory.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControlOptions } from '@angular/forms';
import { FastFormControl } from '../control/fast-form-control';

@Injectable({
  providedIn: 'any',
})
export class FastFormsService {

  constructor(private readonly controlFactory: ControlFactoryService,
              @Optional() private readonly http?: HttpClient) {
  }

  public createSingleControl(question: Question): FastFormControl {
    return new FastFormControl(question, question.defaultValue);
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
    return formGroup;
  }
}
