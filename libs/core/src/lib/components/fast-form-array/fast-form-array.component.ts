import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Control } from '../../control/control.decorator';
import { FastFormArray, FORM_CONTROL } from '@ngx-fast-forms/core';

@Control({
  type: 'array',
  controlType: 'array'
})
@Component({
  selector: 'aff-form-array',
  templateUrl: './fast-form-array.component.html'
})
export class FastFormArrayComponent {

  constructor(@Inject(FORM_CONTROL) public formArray: FastFormArray) {
  }

  public isControl(data: unknown): boolean {
    return data instanceof FormControl;
  }

  public isGroup(data: unknown): boolean {
    return data instanceof FormGroup;
  }
}
