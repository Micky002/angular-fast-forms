import { Component, Inject, Optional } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Control } from '../../control/control.decorator';
import { BaseFormArrayComponent } from '../base/base-array.component';
import { FORM_CONTROL } from '@ngx-fast-forms/core';
import { FastFormBuilder, hasControlWrapper } from '../../service/fast-form-builder';

@Control({
  type: 'array',
  controlType: 'array'
})
@Component({
  selector: 'aff-form-array',
  templateUrl: './fast-form-array.component.html'
})
export class FastFormArrayComponent extends BaseFormArrayComponent {

  constructor(private cb: FastFormBuilder,
              @Inject(FORM_CONTROL) @Optional() public array?: FormArray) {
    super();
    // console.log(array);
  }

  public isControl(data: unknown): boolean {
    return data instanceof FormControl;
  }

  public isGroup(data: unknown): boolean {
    return data instanceof FormGroup;
  }

  addRow(i?: number) {
    if (this.array && hasControlWrapper(this.array)) {
      if (i !== undefined) {
        // this.array.insert(i + 1, this.cf.create(this.array[QuestionWrapper]));
        this.array.insert(i + 1, this.cb.newArrayEntry(this.array));
      } else {
        // this.array.push(this.cf.create(this.array[QuestionWrapper]));
        this.array.push(this.cb.newArrayEntry(this.array));
      }
    }
  }

  deleteRow(i?: number) {
    if (i !== undefined) {
      this.array?.removeAt(i);
    }
  }
}
