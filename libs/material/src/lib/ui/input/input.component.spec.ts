import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CONTROL_PROPERTIES, FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';
import { InputProperties } from './input.models';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        InputComponent
      ],
      providers: [
        {
          provide: FORM_CONTROL,
          useValue: new FormControl()
        },
        {
          provide: QuestionDefinition,
          useValue: new QuestionDefinition({
            id: 'testValue',
            type: 'mat-input',
            label: 'Test label'
          })
        },
        {
          provide: CONTROL_PROPERTIES,
          useValue: {} as InputProperties
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
