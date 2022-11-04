import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayComponent } from './form-array.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FastFormsModule } from '@ngx-fast-forms/core';

describe('FormArrayComponent', () => {
  let component: FormArrayComponent;
  let fixture: ComponentFixture<FormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FastFormsModule,
        MaterialFastFormsModule
      ],
      declarations: [
        FormArrayComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
