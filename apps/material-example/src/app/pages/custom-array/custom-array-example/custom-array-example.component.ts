import { Component, OnInit } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';
import { ButtonProperties } from '@ngx-fast-forms/material';

@Component({
  selector: 'frontend-custom-array-example',
  templateUrl: './custom-array-example.component.html',
  styleUrls: ['./custom-array-example.component.scss']
})
export class CustomArrayExampleComponent implements OnInit {

  public form: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.form = this.formService.createDynamicForm([{
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
            type: 'mat-input'
          }, {
            id: 'time-add-action',
            type: 'mat-button',
            properties: {
              type: 'icon-button',
              icon: 'add_circle_outline'
            } as ButtonProperties
          }, {
            id: 'time-copy-action',
            type: 'mat-button',
            properties: {
              type: 'icon-button',
              icon: 'content_copy'
            } as ButtonProperties
          }, {
            id: 'time-delete-action',
            type: 'mat-button',
            properties: {
              type: 'icon-button',
              icon: 'clear'
            } as ButtonProperties
          }]
        }]
      }]
    }]);
  }

  ngOnInit(): void {
    this.form.setValue({
      'test-array': [{
        name: 'asdf'
      }, {
        name: 'zwei'
      }, {
        name: 'drei'
      }, {
        name: 'vier'
      }]
    });
  }
}

// TODO: add warning if no control with name is registered
