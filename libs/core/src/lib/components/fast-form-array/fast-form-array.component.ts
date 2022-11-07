import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Control } from '../../control/control.decorator';
import { BaseFormArrayComponent } from '../base/base-array.component';

@Control({
  type: 'array',
  controlType: 'array'
})
@Component({
  selector: 'aff-form-array',
  templateUrl: './fast-form-array.component.html'
})
export class FastFormArrayComponent extends BaseFormArrayComponent {

  public isControl(data: unknown): boolean {
    return data instanceof FormControl;
  }

  public isGroup(data: unknown): boolean {
    return data instanceof FormGroup;
  }
}
