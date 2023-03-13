import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { ActionButtonsComponent } from './action-buttons.component';
import { Provider } from '@angular/core';
import {
  ActionControlFactory,
  ActionGroupFactory,
  ActionService,
  CONTROL_ID,
  ControlIdMock,
  FORM_CONTROL
} from '@ngx-fast-forms/core';
import { MatIconModule } from '@angular/material/icon';

describe('ActionButtonsComponent', () => {
  let component: ActionButtonsComponent;
  let fixture: ComponentFixture<ActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [ActionButtonsComponent],
      providers: [
        ActionService,
        {
          provide: CONTROL_ID,
          useValue: new ControlIdMock('name')
        } as Provider,
        {
          provide: FORM_CONTROL,
          useValue: ActionGroupFactory.create({
            add: ActionControlFactory.create(),
            copy: ActionControlFactory.create(),
            delete: ActionControlFactory.create()
          })
        } as Provider
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
