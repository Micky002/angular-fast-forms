import { Component, OnInit } from '@angular/core';
import { FastFormGroup, FastFormsService, Question } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-material-example',
  templateUrl: './material-example.component.html',
  styleUrls: ['./material-example.component.scss'],
})
export class MaterialExampleComponent implements OnInit {

  public form!: FastFormGroup;
  public httpForm!: FastFormGroup;

  public definition: Array<Question> = [{
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
      label: 'Row 2',
      validation: {
        minLength: 5
      }
    }, {
      id: 'row-input-3',
      type: 'date-input',
      label: 'Date input'
    }]
  }]

  set def(value: Array<Question>) {
    this.definition = value;
    this.form.setQuestions(this.definition);
  }

  constructor(private fastFormService: FastFormsService) {
    this.form = fastFormService.createDynamicForm(this.definition);
  }

  ngOnInit(): void {
    this.httpForm = this.fastFormService.createHttpForm('assets/example-form.json');
  }

  submitEvent(data: any) {
    console.log(data);
  }
}
