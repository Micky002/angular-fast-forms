import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateTime, Info } from 'luxon';
import { Inject, Injectable } from '@angular/core';


export function setToJson(dateTime: DateTime): DateTime {
  dateTime.toJSON = () => {
    return dateTime.toISODate();
  };
  return dateTime;
}

@Injectable()
export class CodenturyLuxonDateAdapter extends DateAdapter<DateTime> {

  private readonly INVALID_DATE = 'invalid date';

  constructor(@Inject(MAT_DATE_LOCALE) locale: string) {
    super();
    this.setLocale(locale);
  }

  addCalendarDays(date: DateTime, days: number): DateTime {
    return setToJson(date.plus({days}));
  }

  addCalendarMonths(date: DateTime, months: number): DateTime {
    return setToJson(date.plus({months}));
  }

  addCalendarYears(date: DateTime, years: number): DateTime {
    return setToJson(date.plus({years}));
  }

  clone(date: DateTime): DateTime {
    return setToJson(DateTime.fromJSDate(date.toJSDate()));
  }

  createDate(year: number, month: number, day: number): DateTime {
    const createdDate = this.now().set({
      year: year,
      month: month + 1,
      day: day
    }).startOf('day');
    return setToJson(createdDate);
  }

  format(date: DateTime, displayFormat: string): string {
    return date.toFormat(displayFormat, {locale: this.locale});
  }

  getDate(date: DateTime): number {
    return date.day;
  }

  getDateNames(): string[] {
    return [...Array(31).keys()].map(day => (day + 1) + '');
  }

  getDayOfWeek(date: DateTime): number {
    return date.weekday;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const dayNames = Info.weekdays(style);
    const lastItem = dayNames.pop();
    if (lastItem) {
      dayNames.unshift(lastItem);
    }
    return dayNames;
  }

  getFirstDayOfWeek(): number {
    return 1;
  }

  getMonth(date: DateTime): number {
    return date.month - 1;
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return Info.months(style);
  }

  getNumDaysInMonth(date: DateTime): number {
    return date.daysInMonth;
  }

  getYear(date: DateTime): number {
    return date.year;
  }

  getYearName(date: DateTime): string {
    return date.toFormat('yyyy');
  }

  invalid(): DateTime {
    return DateTime.invalid(this.INVALID_DATE);
  }

  isDateInstance(obj: unknown): boolean {
    return typeof obj === 'string' ||
        obj instanceof String ||
        obj instanceof DateTime;
  }

  isValid(date: DateTime): boolean {
    return date.isValid;
  }

  parse(value: unknown, parseFormat: string): DateTime | null {
    let dateTime: DateTime;
    if (value instanceof DateTime) {
      dateTime = value.startOf('day');
    } else if (typeof value === 'string') {
      dateTime = DateTime.fromFormat(value, parseFormat, {locale: this.locale}).startOf('day');
    } else {
      throw new Error('Date type not supported.');
    }

    return setToJson(dateTime);
  }

  toIso8601(date: DateTime): string {
    return date.toISO();
  }

  today(): DateTime {
    return this.now().startOf('day');
  }

  actualDate(utcNormalizedDate: DateTime): DateTime {
    return utcNormalizedDate.minus({days: this.getDayOffsetFromUtc()});
  }

  getDayOffsetFromUtc(): number {
    const nowUtc = this.now().toUTC();
    const nowUtcShifted = nowUtc.minus({minutes: this.getMinuteOffsetFromUtc()});
    return -nowUtcShifted.startOf('day').diff(nowUtc.startOf('day'), 'day').days;
  }

  getMinuteOffsetFromUtc(): number {
    return new Date().getTimezoneOffset();
  }

  now(): DateTime {
    return DateTime.now();
  }
}
