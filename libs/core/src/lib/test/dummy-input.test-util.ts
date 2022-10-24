import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { FormControl } from '@angular/forms';
import { Control } from '../control/control.decorator';

@Control({
  type: 'dummy-input'
})
@Component({
  selector: 'aff-dummy-input',
  template: `
    <div>
      <input [formControl]="control" [id]="question.id">
    </div>
  `
})
export class DummyInputComponent extends BaseFormControlComponent<any, FormControl> {
}
