import { Component } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-material-example',
  templateUrl: './material-example.component.html',
  styleUrls: ['./material-example.component.scss'],
})
export class MaterialExampleComponent {

  public form!: FastFormGroup;

  constructor(private fastFormService: FastFormsService) {
    this.form = fastFormService.createDynamicForm([{
      id: 'test-input',
      type: 'input',
      label: 'Example input'
    }, {
      id: 'test-another-input',
      type: 'input'
    }, {
      id: 'form-row',
      type: 'row',
      children: [{
        id: 'row-input-1',
        type: 'input',
        label: 'Row 1'
      }, {
        id: 'row-input-2',
        type: 'input',
        label: 'Row 2'
      }, {
        id: 'row-input-3',
        type: 'input',
        label: 'Row 3',
        validation: {
          minLength: 5
        }
      }]
    }]);
  }
}