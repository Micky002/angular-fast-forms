import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { CustomArrayExampleComponent } from './custom-array-example.component';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { TimeArrayComponent } from '../time-array/time-array.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { ActionButtonsComponent } from '../time-array/action-buttons/action-buttons.component';
import { DateRangeInputComponent } from '../../custom-nested-control/date-range-input/date-range-input.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomArrayExampleComponent', () => {
  let component: CustomArrayExampleComponent;
  let fixture: ComponentFixture<CustomArrayExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialFastFormsModule,
        FastFormsModule.forRoot({
          controls: [
            ActionButtonsComponent,
            TimeArrayComponent,
            DateRangeInputComponent
          ]
        })
      ],
      declarations: [
        CustomArrayExampleComponent,
        TimeArrayComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomArrayExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
