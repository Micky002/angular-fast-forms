import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputComponent } from './date-input.component';
import { FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';
import { Provider } from '@angular/core';

describe('InputComponent', () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DateInputComponent
      ],
      providers: [
        {
          provide: QuestionDefinition,
          useValue: new QuestionDefinition({
            id: 'test',
            type: 'date-input'
          })
        } as Provider,
        {
          provide: FORM_CONTROL,
          useValue: DateInputComponent.createControl()
        } as Provider
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
