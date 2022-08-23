import { Component } from '@angular/core';
import { DateInputProperties } from './date-input.properties';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { CodenturyLuxonDateAdapter } from './codentury-luxon-date-adapter';
import { FastFormControl } from '@ngx-fast-forms/core';

@UntilDestroy()
@Component({
  selector: 'code-date-input',
  templateUrl: './date-input.component.html',
  providers: [{
    provide: DateAdapter,
    useClass: CodenturyLuxonDateAdapter
  }]
})
export class DateInputComponent extends FastFormControl {

  constructor() {
    super();
  }

  private get properties(): DateInputProperties {
    return this.baseProperties as DateInputProperties;
  }

  public getControl(): FormControl<string> {
    return this.control as FormControl;
  }
}