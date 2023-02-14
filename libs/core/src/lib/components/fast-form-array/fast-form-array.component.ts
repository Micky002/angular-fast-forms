import { Component, Inject, Optional } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Control } from '../../control/control.decorator';
import { BaseFormArrayComponent } from '../base/base-array.component';
import { FORM_CONTROL } from '@ngx-fast-forms/core';

@Control({
  type: 'array',
  controlType: 'array'
})
@Component({
  selector: 'aff-form-array',
  templateUrl: './fast-form-array.component.html'
})
export class FastFormArrayComponent extends BaseFormArrayComponent {

  constructor(@Inject(FORM_CONTROL) @Optional() public array?: FormArray) {
    super();
  }

  public isControl(data: unknown): boolean {
    return data instanceof FormControl;
  }

  public isGroup(data: unknown): boolean {
    return data instanceof FormGroup;
  }
}
