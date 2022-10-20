import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ControlFactoryService } from '../../service/control-factory.service';
import { ValidatorFactoryService } from '../../validation/validator-factory.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormControlComponent } from '../base/base-control.component';
import { FastFormGroupComponent } from './fast-form-group.component';
import { FastFormsService } from '../../service/fast-forms.service';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from '../../model';

class DummyControl extends BaseFormControlComponent {
}

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
        ControlFactoryService,
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
    component._formGroup.setQuestions([{
      id: 'test',
      type: 'input',
      validation: {
        required: true,
        minLength: 5
      }
    }]);
    jest.spyOn(component.submitEvent, 'next');
    component.processOnSubmit({id: 'meins'});
    expect(component.submitEvent.next).toHaveBeenCalledTimes(0);

    component._formGroup.patchValue({test: 'Hallo'});
    component.processOnSubmit({id: 'meins'});
    expect(component.submitEvent.next).toHaveBeenCalledTimes(1);
  });
});
