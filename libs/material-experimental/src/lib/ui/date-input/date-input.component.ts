import { Component, Inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { CodenturyLuxonDateAdapter } from './codentury-luxon-date-adapter';
import { Control, ControlFactory, FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';
import { DateFormControl } from './date-form-control';

@Control({
  type: 'date-input'
})
@Component({
  selector: 'aff-material-experimental-date-input',
  templateUrl: './date-input.component.html',
  providers: [{
    provide: DateAdapter,
    useClass: CodenturyLuxonDateAdapter
  }]
})
export class DateInputComponent {

  constructor(public definition: QuestionDefinition,
              @Inject(FORM_CONTROL) public control: FormControl) {
  }

  @ControlFactory()
  public static createControl() {
    return new DateFormControl();
  }
}
