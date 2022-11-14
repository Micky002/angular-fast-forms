import { Component } from '@angular/core';
import { DateInputProperties } from './date-input.properties';
import { DateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { CodenturyLuxonDateAdapter } from './codentury-luxon-date-adapter';
import { BaseFormControlComponent } from '@ngx-fast-forms/core';

@Component({
  selector: 'aff-material-experimental-date-input',
  templateUrl: './date-input.component.html',
  providers: [{
    provide: DateAdapter,
    useClass: CodenturyLuxonDateAdapter
  }]
})
export class DateInputComponent extends BaseFormControlComponent<DateInputProperties, FormControl> {
}
