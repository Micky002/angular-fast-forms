import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomValidatorComponent } from './custom-validator.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';
import { RouterTestingModule } from '@angular/router/testing';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { AsyncRequiredValidatorService } from '../validators/async-required-validator.service';
import { CustomStartWithService } from '../validators/custom-start-with.service';
import { CustomRequiredService } from '../validators/custom-required.service';
import { AsyncStartWithService } from '../validators/async-start-with.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomValidatorComponent', () => {
  let component: CustomValidatorComponent;
  let fixture: ComponentFixture<CustomValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        MaterialFastFormsModule,
        FastFormsModule.forChild({
          validators: [
            AsyncRequiredValidatorService,
            CustomStartWithService,
            CustomRequiredService,
            AsyncStartWithService
          ]
        })
      ],
      declarations: [
        CustomValidatorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
