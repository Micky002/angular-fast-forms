import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { FormArrayComponent } from './form-array.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormArrayComponent', () => {
  let component: FormArrayComponent;
  let fixture: ComponentFixture<FormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FastFormsModule,
        MaterialFastFormsModule
      ],
      declarations: [
        FormArrayComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
