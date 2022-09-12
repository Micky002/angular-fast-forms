import { Component } from '@angular/core';
import { BaseFormGroupComponent, Question } from '@ngx-fast-forms/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'frontend-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
})
export class DateRangeInputComponent extends BaseFormGroupComponent {

  public static controlFactory(question: Question) {
    return new FormGroup({
      from: new FormControl(),
      until: new FormControl()
    });
  }
}
