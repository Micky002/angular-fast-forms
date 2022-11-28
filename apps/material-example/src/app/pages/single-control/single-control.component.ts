import { Component } from '@angular/core';
import { FastFormControl, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-single-control',
  templateUrl: './single-control.component.html',
  styleUrls: ['./single-control.component.scss']
})
export class SingleControlComponent {

  public control: FastFormControl;

  constructor(private formService: FastFormsService) {
    this.control = formService.createSingleControl({
      id: 'test',
      type: 'mat-input',
      label: 'Test Name',
      defaultValue: 'One'
    });
  }
}
