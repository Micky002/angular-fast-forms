import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionDefinition } from '../components/question-definition';
import { FORM_CONTROL } from '../components/util/inject-token';
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
export class DummyInputComponent {

  constructor(@Inject(FORM_CONTROL) public control: FormControl,
              public question: QuestionDefinition) {
  }
}
