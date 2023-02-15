import { Component, Inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Control } from '../../control/control.decorator';
import { FastFormBuilder, hasControlWrapper } from '../../service/fast-form-builder';
import { FORM_CONTROL } from '../util/inject-token';

@Control({
  type: 'array-v2',
  controlType: 'array'
})
@Component({
  selector: 'aff-form-array-v2',
  templateUrl: './fast-form-array-v2.component.html'
})
export class FastFormArrayV2Component {

  constructor(@Inject(FORM_CONTROL) public array: FormArray,
              private fb: FastFormBuilder) {
  }

  addRow(i?: number) {
    if (this.array && hasControlWrapper(this.array)) {
      if (i !== undefined) {
        this.array.insert(i + 1, this.fb.newArrayEntry(this.array));
      } else {
        this.array.push(this.fb.newArrayEntry(this.array));
      }
    }
  }

  deleteRow(i?: number) {
    if (i !== undefined) {
      this.array?.removeAt(i);
    }
  }
}
