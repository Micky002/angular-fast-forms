import { FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import { setToJson } from './codentury-luxon-date-adapter';

export class DateFormControl extends FormControl {

  override setValue(value: string | DateTime, options?: { onlySelf?: boolean; emitEvent?: boolean; emitModelToViewChange?: boolean; emitViewToModelChange?: boolean }) {
    if (value === null || value === undefined) {
      super.setValue(value, options);
      return;
    }
    super.setValue(this.normalizeDate(value), options);
  }

  override patchValue(value: string | DateTime, options?: { onlySelf?: boolean; emitEvent?: boolean; emitModelToViewChange?: boolean; emitViewToModelChange?: boolean }) {
    if (value === null || value === undefined) {
      super.patchValue(value, options);
      return;
    }
    super.patchValue(this.normalizeDate(value), options);
  }

  private normalizeDate(value: unknown): DateTime {
    let dateTime: DateTime;
    if (value instanceof DateTime) {
      dateTime = value.startOf('day');
    } else if (typeof value === 'string') {
      dateTime = DateTime.fromFormat(value, 'yyyy-LL-dd').startOf('day');
    } else {
      throw new Error('Date type not supported.');
    }

    return setToJson(dateTime);
  }
}
