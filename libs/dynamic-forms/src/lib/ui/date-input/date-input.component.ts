import { Component } from '@angular/core';
import { DateInputProperties } from './date-input.properties';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DateAdapter } from '@angular/material/core';
import { DynamicFormControl } from '../../core/dynamic-form-control';
import { FormControl } from '@angular/forms';
import { CodenturyLuxonDateAdapter } from './codentury-luxon-date-adapter';

@UntilDestroy()
@Component({
  selector: 'code-date-input',
  templateUrl: './date-input.component.html',
  providers: [{
    provide: DateAdapter,
    useClass: CodenturyLuxonDateAdapter
  }]
})
export class DateInputComponent extends DynamicFormControl {

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
