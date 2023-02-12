import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFormBuilder } from '../../../../../../libs/core/src/lib/service/fast-form-builder';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FastFormsModule } from '@ngx-fast-forms/core';
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
  `,
  styles: []
})
export class GroupComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private fb: FastFormBuilder) {
    this.formGroup = fb.group({}, {
      name: fb.control(null, {type: 'mat-input', label: 'Meins'}),
      hans: fb.control(null, {type: 'mat-input', label: 'Hans'}),
      // test: fb.array({}, {
      //   type: 'mat-input'
      // }),
      arrayControl: fb.array({}, fb.control(null, {type: 'mat-input', label: 'fb array'})),
      arrayGroup: fb.array({}, fb.group({}, {
        first: fb.control(2, {
          type: 'mat-select',
          label: 'First select',
          properties: {options: [{name: 'Eins', value: 1}, {name: 'Zwei', value: 2}]} as SelectProperties
        }),
        second: fb.control(null, {type: 'mat-input', label: 'Second input'})
      }))
    });
    console.log(this.formGroup);
  }

  ngOnInit(): void {
  }
}
