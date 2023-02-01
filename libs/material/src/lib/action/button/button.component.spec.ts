import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { ActionService, CONTROL_ID, CONTROL_PROPERTIES, QuestionDefinition } from '@ngx-fast-forms/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ButtonComponent
      ],
      providers: [
        ActionService,
        {
          provide: CONTROL_PROPERTIES,
          useValue: {}
        }, {
          provide: CONTROL_ID,
          useValue: 'test-button-id'
        }, {
          provide: QuestionDefinition,
          useValue: new QuestionDefinition({
            type: ''
          })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
