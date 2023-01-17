import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FastFormGroup, FastFormsModule, FastFormsService } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';

@Component({
  selector: 'frontend-nested',
  standalone: true,
  imports: [
    CommonModule,
    FastFormsModule,
    MaterialFastFormsModule
  ],
  template: `
    <aff-form-group [formGroup]="nestedGroup"></aff-form-group>

    <pre>{{nestedGroup.value | json}}</pre>
  `
})
export class NestedComponent {

  nestedGroup: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.nestedGroup = this.formService.createGroup([
      {
        id: 'name',
        type: 'mat-input',
        label: 'Name'
      },
      {
        id: 'address',
        type: 'group',
        children: [
          {
            id: 'street',
            type: 'mat-input',
            label: 'Street'
          }
        ]
      }
    ]);
  }
}
