import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseFormArrayComponent } from '../base/base-array.component';

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
