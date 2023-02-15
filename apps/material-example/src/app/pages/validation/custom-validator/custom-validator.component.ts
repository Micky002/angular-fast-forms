import { Component } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'matex-custom-validator',
  templateUrl: './custom-validator.component.html',
  styleUrls: ['./custom-validator.component.scss']
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
    }, {
      id: 'test-async-input',
      type: 'input',
      label: 'Start with \'asdf\' async',
      validation: {
        customAsync: 'async-start-with'
      }
    }, {
      id: 'test-async-vali-input',
      type: 'input',
      label: 'Start with \'asdf\' async',
      validation: {
        customAsync: 'custom-async-required'
      }
    }]);
  }
}
