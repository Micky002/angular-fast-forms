import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputComponent } from './date-input.component';
import { FormControl } from '@angular/forms';

describe('InputComponent', () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DateInputComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    component.question = {
      type: 'input',
      id: 'test-id'
    };
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
