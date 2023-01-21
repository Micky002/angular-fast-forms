import { Component } from '@angular/core';
import { FastFormControl, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-single-control',
  template: `
    <aff-form-control [control]="control"></aff-form-control>
  `
})
export class SingleControlComponent {

  public control: FastFormControl;

  constructor(private formService: FastFormsService) {
    this.control = formService.createControl({
      type: 'mat-input',
      label: 'Test Name',
      defaultValue: 'One'
    });
  }
}
