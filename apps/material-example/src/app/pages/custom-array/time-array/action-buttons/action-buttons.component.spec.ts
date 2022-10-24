import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsComponent } from './action-buttons.component';
import { Provider } from '@angular/core';
import { ActionService, CONTROL_ID } from '@ngx-fast-forms/core';
import { ControlIdImpl } from '../../../../../../../../libs/core/src/lib/internal/control/control-id-impl';

describe('ActionButtonsComponent', () => {
  let component: ActionButtonsComponent;
  let fixture: ComponentFixture<ActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionButtonsComponent],
      providers: [
        ActionService,
        {
          provide: CONTROL_ID,
          useValue: new ControlIdImpl([{
            id: 'name'
          }])
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
