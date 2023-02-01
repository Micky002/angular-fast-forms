import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FORM_CONTROL } from '@ngx-fast-forms/core';

import { DateRangeInputComponent } from './date-range-input.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DateRangeInputComponent', () => {
  let component: DateRangeInputComponent;
  let fixture: ComponentFixture<DateRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatNativeDateModule
      ],
      providers: [
        {
          provide: FORM_CONTROL,
          useValue: DateRangeInputComponent.createFormGroup({
            id: 'test',
            type: 'date-range'
          })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
