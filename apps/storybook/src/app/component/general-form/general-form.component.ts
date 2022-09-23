import { Component } from '@angular/core';
import { FastFormGroup, FastFormsService, Question } from '@ngx-fast-forms/core';

@Component({
  selector: 'angular-fast-forms-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent {

  form: FastFormGroup;

  set formDefinition(questions: Array<Question>) {
    this.form.setQuestions(questions);
  }

  constructor(private formService: FastFormsService) {
    this.form = formService.createDynamicForm([]);
  }
}
