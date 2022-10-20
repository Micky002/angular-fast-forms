import { Component, OnInit } from '@angular/core';
import { ActionEvent, FastFormArray, FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';
import { ButtonProperties } from '@ngx-fast-forms/material';

@Component({
  selector: 'frontend-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {

  form: FastFormGroup;
  formArrayWithGroup: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.form = this.formService.createDynamicForm([{
      id: 'test-array',
      type: 'array',
      children: [{
        id: 'first-input',
        type: 'input'
      }]
    }]);
    this.formArrayWithGroup = this.formService.createDynamicForm([{
      id: 'test-array',
      type: 'array',
      children: [{
        id: 'first-group',
        type: 'group',
        children: [{
          id: 'ignore',
          type: 'row',
          children: [{
            id: 'first-input',
            type: 'input',
            label: 'Input one'
          }, {
            id: 'second-input',
            type: 'input',
            label: 'Input Two'
          }, {
            id: 'add-button',
            type: 'button',
            properties: {
              type: 'text-button',
              text: 'Add',
              icon: 'add'
            } as ButtonProperties
          }]
        }]
      }]
    }]);
  }

  ngOnInit(): void {
    this.form.setValue({
      'test-array': [
        'prefilled value',
        ''
      ]
    });
    this.formArrayWithGroup.patchValue({
      'test-array': [{
        'first-input': 'first'
      }, {
        'first-input': 'first',
        'second-input': 'testing'
      }]
    });
  }

  setValue() {
    this.form.setValue({
      'test-array': [
        'testing testing testing',
        'just for demo',
        'automatic array size adoption'
      ]
    });
  }

  patchValue() {
    this.form.patchValue({
      'test-array': [
        'first value',
        'second value',
        'third value',
        'fourth value'
      ]
    });
  }

  actionEvent(event: ActionEvent) {
    const [arrayId, index] = event.args;
    const arrayControl = this.formArrayWithGroup.get(arrayId as string) as FastFormArray;
    arrayControl.addRow(index as number + 1);
  }
}
