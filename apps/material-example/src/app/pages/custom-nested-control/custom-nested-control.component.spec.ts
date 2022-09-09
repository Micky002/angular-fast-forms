import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNestedControlComponent } from './custom-nested-control.component';
import { FastFormsCoreModule, registerGroup } from '@ngx-fast-forms/core';
import { DateRangeInputComponent } from './date-range-input/date-range-input.component';

describe('CustomNestedControlComponent', () => {
  let component: CustomNestedControlComponent;
  let fixture: ComponentFixture<CustomNestedControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FastFormsCoreModule
      ],
      declarations: [
        CustomNestedControlComponent,
        DateRangeInputComponent,
      ],
      providers: [
        registerGroup('date-range', DateRangeInputComponent)
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
