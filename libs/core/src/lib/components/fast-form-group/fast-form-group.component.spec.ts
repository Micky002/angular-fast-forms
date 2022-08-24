import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControlFactoryService } from '../../service/form-control-factory.service';
import { ValidatorFactoryService } from '../../validation/validator-factory.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DYNAMIC_FORM_CONTROL,
  DynamicFormDefinition, FastFormControl,
  FastFormGroupComponent,
  FastFormsService
} from '@ngx-fast-forms/core';

class DummyControl extends FastFormControl {}

describe('FastFormGroupComponent', () => {
  let component: FastFormGroupComponent;
  let fixture: ComponentFixture<FastFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        FastFormGroupComponent
      ],
      providers: [
        FastFormsService,
        FormControlFactoryService,
        ValidatorFactoryService,
        {
          provide: DYNAMIC_FORM_CONTROL,
          useValue: {
            type: 'input',
            component: DummyControl
          } as DynamicFormDefinition,
          multi: true
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only trigger submit when form is valid', () => {
    component.form.setQuestions([{
      id: 'test',
      type: 'input',
      validation: {
        required: true,
        minLength: 5
      }
    }])
    jest.spyOn(component.codeOnSubmit, 'next');
    component.processOnSubmit({id: 'meins'});
    expect(component.codeOnSubmit.next).toHaveBeenCalledTimes(0);

    component.form.patchValue({test: 'Hallo'})
    component.processOnSubmit({id: 'meins'});
    expect(component.codeOnSubmit.next).toHaveBeenCalledTimes(1);
  });
});
