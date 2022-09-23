import { Component } from '@angular/core';
import { BaseFormControlComponent, Control, ControlFactory } from '@ngx-fast-forms/core';
import { FormControl, FormGroup } from '@angular/forms';

@Control({
  type: 'date-range'
})
@Component({
  selector: 'frontend-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss']
})
export class DateRangeInputComponent extends BaseFormControlComponent<any, FormGroup> {

  @ControlFactory()
  public static createFormGroup() {
    return new FormGroup({
      from: new FormControl(),
      until: new FormControl()
    });
  }
}
