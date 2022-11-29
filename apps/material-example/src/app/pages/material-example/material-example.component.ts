import { Component, OnInit } from '@angular/core';
import { FastFormGroup, FastFormsService, Question } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-material-example',
  templateUrl: './material-example.component.html',
  styleUrls: ['./material-example.component.scss']
})
export class MaterialExampleComponent implements OnInit {

  public form!: FastFormGroup;
  public disabledForm!: FastFormGroup;
  public httpForm!: FastFormGroup;

  public definition: Array<Question> = [{
    id: 'test-input',
    type: 'input',
    label: 'Example input'
  }, {
    id: 'test-another-input',
    type: 'input'
  }, {
    id: 'test-disabled-input',
    type: 'input',
    label: 'Disabled input',
    disabled: true
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
      label: 'Row 2',
      validation: {
        minLength: 5
      }
    }, {
      id: 'row-input-3',
      type: 'date-input',
      label: 'Date input'
    }]
  }];

  public disabledFormDefinition: Array<Question> = [{
    id: 'form-group',
    type: 'group',
    disabled: true,
    children: [{
      id: 'group-input-1',
      type: 'input',
      label: 'Group 1'
    }, {
      id: 'group-input-2',
      type: 'input',
      label: 'Group 2',
      validation: {
        minLength: 5
      }
    }, {
      id: 'group-input-3',
      type: 'date-input',
      label: 'Date input'
    }]
  }];

  set def(value: Array<Question>) {
    this.definition = value;
    this.form.setQuestions(this.definition);
  }

  constructor(private fastFormService: FastFormsService) {
    this.form = fastFormService.createDynamicForm(this.definition);
    this.disabledForm = fastFormService.createDynamicForm(this.disabledFormDefinition);
  }

  ngOnInit(): void {
    this.httpForm = this.fastFormService.createHttpForm('assets/example-form.json');
  }
}
