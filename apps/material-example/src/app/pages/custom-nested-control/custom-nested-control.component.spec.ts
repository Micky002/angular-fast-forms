import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNestedControlComponent } from './custom-nested-control.component';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { DateRangeInputComponent } from './date-range-input/date-range-input.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomNestedControlComponent', () => {
  let component: CustomNestedControlComponent;
  let fixture: ComponentFixture<CustomNestedControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatNativeDateModule,
        FastFormsModule.forRoot({
          controls: [
            DateRangeInputComponent
          ]
        })
      ],
      declarations: [
        CustomNestedControlComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomNestedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
