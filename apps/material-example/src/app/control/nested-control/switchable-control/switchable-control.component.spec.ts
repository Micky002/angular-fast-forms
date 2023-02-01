import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchableControlComponent } from './switchable-control.component';
import { FORM_CONTROL } from '@ngx-fast-forms/core';
import { SwitchableControlModule } from './switchable-control.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SwitchableControlComponent', () => {
  let component: SwitchableControlComponent;
  let fixture: ComponentFixture<SwitchableControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SwitchableControlComponent,
        SwitchableControlModule
      ],
      providers: [
        {
          provide: FORM_CONTROL,
          useValue: SwitchableControlComponent.createGroup({})
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
