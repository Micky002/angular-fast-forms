import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuestionDefinition } from '../components/question-definition';
import { FORM_CONTROL } from '../components/util/inject-token';
import { Control } from '../control/control.decorator';
import { CommonModule } from '@angular/common';

@Control({
  type: 'input'
})
@Component({
  selector: 'aff-dummy-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
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
