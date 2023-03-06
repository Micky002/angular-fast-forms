import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FastFormBuilder, FastFormsModule, FormGroupV2Properties } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule, SelectProperties } from '@ngx-fast-forms/material';

@Component({
  selector: 'matex-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FastFormsModule,
    MaterialFastFormsModule
  ],
  template: `
    <form [formGroup]="formGroup" affRenderer></form>
    <div [renderControl]="formGroup.get('arrayControl')"></div>
  `,
  styles: []
})
export class GroupComponent {

  public formGroup: FormGroup;

  constructor(private fb: FastFormBuilder) {
    this.formGroup = fb.group({
      properties: {
        alignment: 'row'
      } as FormGroupV2Properties
    }, {
      name: fb.dynamicControl('My Name', {type: 'mat-input', label: 'Name'}),
      hans: fb.dynamicControl(null, {type: 'mat-input', label: 'Hans'}),
      arrayControl: fb.array({}, fb.dynamicControl('Init value', {type: 'mat-input', label: 'fb array'})),
      arrayGroup: fb.array({}, fb.group({}, {
        first: fb.dynamicControl(2, {
          type: 'mat-select',
          label: 'First select',
          properties: {options: [{name: 'Eins', value: 1}, {name: 'Zwei', value: 2}]} as SelectProperties
        }),
        second: fb.dynamicControl(null, {type: 'mat-input', label: 'Second input'})
      }))
    });
  }
}
