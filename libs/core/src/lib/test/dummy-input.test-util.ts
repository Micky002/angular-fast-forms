import { Component, Provider } from '@angular/core';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from '../model';
import { FormControl } from '@angular/forms';

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

export function dummyInputProvider(): Provider {
  return {
    provide: DYNAMIC_FORM_CONTROL,
    multi: true,
    useValue: {
      type: 'dummy-input',
      component: DummyInputComponent
    } as DynamicFormDefinition
  };
}
