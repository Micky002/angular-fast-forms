import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { CustomNestedControlComponent } from './custom-nested-control.component';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { DateRangeInputComponent } from './date-range-input/date-range-input.component';

describe('CustomNestedControlComponent', () => {
  let component: CustomNestedControlComponent;
  let fixture: ComponentFixture<CustomNestedControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FastFormsModule.forRoot({
          controls: [
            DateRangeInputComponent
          ]
        })
      ],
      declarations: [
        CustomNestedControlComponent,
        DateRangeInputComponent
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
