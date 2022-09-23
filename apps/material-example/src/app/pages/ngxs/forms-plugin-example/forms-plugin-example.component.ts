import { Component } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-forms-plugin-example',
  templateUrl: './forms-plugin-example.component.html',
  styleUrls: ['./forms-plugin-example.component.scss']
})
export class FormsPluginExampleComponent {

  form: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.form = this.formService.createDynamicForm([{
      id: 'first',
      type: 'input',
      validation: {
        minLength: 10
      }
    }]);
  }
}
