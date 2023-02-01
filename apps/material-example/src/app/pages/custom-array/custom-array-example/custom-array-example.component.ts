import { Component, OnInit } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-custom-array-example',
  templateUrl: './custom-array-example.component.html',
  styleUrls: ['./custom-array-example.component.scss']
})
export class CustomArrayExampleComponent implements OnInit {

  public form: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.form = this.formService.group([{
      id: 'test-array',
      type: 'custom-array',
      children: [{
        id: 'ignore-group',
        type: 'group',
        children: [{
          id: 'row-ignore',
          type: 'row',
          children: [{
            id: 'name',
            type: 'mat-input',
            label: 'Name'
          }, {
            id: 'surname',
            type: 'mat-input',
            label: 'Surname'
          }, {
            id: 'dateRange',
            type: 'date-range',
            validation: {
              required: true
            }
          }, {
            id: 'actions',
            type: 'time-array-actions'
          }]
        }]
      }]
    }]);
  }

  ngOnInit(): void {
    this.form.patchValue({
      'test-array': [{
        name: 'asdf'
      }, {
        name: 'zwei',
        surname: 'Tom Turbo'
      }, {
        name: 'drei'
      }, {
        name: 'vier'
      }]
    });
  }
}

// TODO: add warning if no control with name is registered
