import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { SwitchableInputComponent } from './switchable-input.component';
import { FastFormBuilder, FastFormsModule, FORM_CONTROL } from '@ngx-fast-forms/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SwitchableInputModule } from './switchable-input.module';

describe('SwitchableInputComponent', () => {
  let component: SwitchableInputComponent;
  let fixture: ComponentFixture<SwitchableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SwitchableInputComponent,
        SwitchableInputModule,
        FastFormsModule
      ],
      providers: [{
        provide: FORM_CONTROL,
        deps: [FastFormBuilder],
        useFactory: (fb: FastFormBuilder) =>
            fb.dynamicControl(null, {type: 'switch-input'})
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
