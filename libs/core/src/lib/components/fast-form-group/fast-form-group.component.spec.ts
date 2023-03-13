import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormControlComponent } from '../base/base-control.component';
import { FastFormGroupComponent } from './fast-form-group.component';
import { Control } from '../../control/control.decorator';
import { FastFormsService } from '../../service/fast-forms.service';
import { ControlFactoryService } from '../../service/control-factory.service';
import { ValidatorFactoryService } from '../../validation/validator-factory.service';
import { Provider } from '@angular/core';
import { AFF_CONTROL_COMPONENTS } from '../../model';
import { FastFormBuilder } from '../../service/fast-form-builder';

@Control({
  type: 'input'
})
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
        FastFormBuilder,
        FastFormsService,
        ControlFactoryService,
        ValidatorFactoryService, {
          provide: AFF_CONTROL_COMPONENTS,
          useValue: [
            DummyControl
          ],
          multi: true
        } as Provider
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
