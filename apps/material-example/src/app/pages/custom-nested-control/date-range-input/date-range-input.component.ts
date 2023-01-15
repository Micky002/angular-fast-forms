import { Component, Inject } from '@angular/core';
import { Control, ControlFactory, FORM_CONTROL, Question } from '@ngx-fast-forms/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Control({
  type: 'date-range'
})
@Component({
  selector: 'frontend-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss']
})
export class DateRangeInputComponent {

  constructor(@Inject(FORM_CONTROL) public control: FormGroup) {
  }

  @ControlFactory()
  public static createFormGroup(question: Question) {
    if (question.validation?.required) {
      return new FormGroup({
        from: new FormControl(null, [Validators.required]),
        until: new FormControl(null, [Validators.required])
      });
    } else {
      return new FormGroup({
        from: new FormControl(),
        until: new FormControl()
      });
    }
  }
}
