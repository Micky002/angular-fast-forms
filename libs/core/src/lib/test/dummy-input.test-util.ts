import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control } from '../control/control.decorator';
import { FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';

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
export class DummyInputComponent {

  constructor(@Inject(FORM_CONTROL) public control: FormControl,
              public question: QuestionDefinition) {
  }
}
