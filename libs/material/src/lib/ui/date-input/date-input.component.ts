import { Component } from '@angular/core';
import { DateInputProperties } from './date-input.properties';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { CodenturyLuxonDateAdapter } from './codentury-luxon-date-adapter';
import { BaseFormControlComponent } from '@ngx-fast-forms/core';

@UntilDestroy()
@Component({
  selector: 'aff-material-date-input',
  templateUrl: './date-input.component.html',
  providers: [{
    provide: DateAdapter,
    useClass: CodenturyLuxonDateAdapter
  }]
})
export class DateInputComponent extends BaseFormControlComponent<DateInputProperties> {

  constructor() {
    super();
  }

  public getControl(): FormControl<string> {
    return this.control as FormControl;
  }
}
