import { Component } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-custom-validator',
  templateUrl: './custom-validator.component.html',
  styleUrls: ['./custom-validator.component.scss'],
})
export class CustomValidatorComponent {

  public form!: FastFormGroup;

  constructor(private fastFormService: FastFormsService) {
    this.form = fastFormService.createDynamicForm([{
      id: 'test-input',
      type: 'input',
      label: 'Start with \'asdf\'',
      validation: {
        custom: 'custom-start-with:asdf'
      }
    }]);
  }
}
