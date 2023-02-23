import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchableInputComponent } from './switchable-input.component';
import { FORM_CONTROL } from '@ngx-fast-forms/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SwitchableInputComponent', () => {
  let component: SwitchableInputComponent;
  let fixture: ComponentFixture<SwitchableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SwitchableInputComponent
      ],
      providers: [{
        provide: FORM_CONTROL,
        useValue: SwitchableInputComponent.createControl({type: 'switch-input'})
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
