import { Component, OnInit } from '@angular/core';
import { BaseFormGroupComponent, Question } from '@ngx-fast-forms/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'frontend-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
})
export class DateRangeInputComponent extends BaseFormGroupComponent implements OnInit {

  public static controlFactory(question: Question) {
    console.log('controlFactory final')
    return new FormGroup({
      from: new FormControl(),
      until: new FormControl()
    });
  }

  ngOnInit(): void {
    console.log(this.formGroup);
    console.log(this.questions);
    // this.formGroup.addControl('from', new FormControl());
    // this.formGroup.addControl('until', new FormControl());
  }

  get dateRangeFromGroup(): FormGroup {
    return this.formGroup.get('date_range') as FormGroup;
  }
}
