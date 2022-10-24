import { TestBed } from '@angular/core/testing';

import { ControlFactoryService } from './control-factory.service';
import { Component, Provider } from '@angular/core';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { FastFormArray } from '../control/fast-form-array';
import { ActionControl } from '../actions/actions.decorator';
import { Control } from '../control/control.decorator';
import { AFF_CONTROL_COMPONENTS, DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from '../model';
import { FastFormGroup } from '../control/fast-form-group';


@Component({
  selector: 'aff-testing-control',
  template: ''
})
class DummyFormComponent extends BaseFormControlComponent {

}

@ActionControl({
  type: 'add-button'
})
@Component({
  selector: 'aff-testing-action',
  template: ''
})
class DummyActionComponent {

}

@Control({
  type: 'test-row',
  inline: true
})
@Component({
  selector: 'aff-testing-row',
  template: ''
})
class DummyRowComponent {

}

describe('ControlFactoryService', () => {
  let service: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ControlFactoryService,
        ValidatorFactoryService,
        {
          provide: DYNAMIC_FORM_CONTROL,
          multi: true,
          useValue: {
            type: 'test-input',
            component: DummyFormComponent
          } as DynamicFormDefinition
        } as Provider,
        {
          provide: AFF_CONTROL_COMPONENTS,
          multi: true,
          useValue: [
            DummyActionComponent,
            DummyRowComponent
          ]
        } as Provider
      ]
    });
    service = TestBed.inject(ControlFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create control if nothing is registered', () => {
    const control = service.createRawControl({type: 'test-control', id: 'test'});
    expect(control).toBeDefined();
  });

  it('should create control from registered factory', () => {
    service.componentRegistry = [{
      type: 'test-control',
      component: DummyFormComponent,
      controlFactory: () => new FormControl('initial-state')
    }];
    const control = service.createRawControl({type: 'test-control', id: 'test'});
    expect(control).toBeDefined();
    expect(control.value).toEqual('initial-state');
  });

  it('should create control with initial default value', () => {
    service.componentRegistry = [{
      type: 'test-control',
      component: DummyFormComponent
    }];
    const control = service.createRawControl({
      type: 'test-control',
      id: 'test',
      defaultValue: 'my custom default'
    });
    expect(control).toBeDefined();
    expect(control.value).toEqual('my custom default');
  });

  it('should create control from multiple questions', () => {
    const formGroup = new FormGroup({});
    service.createFromQuestions(formGroup, [{
      id: 'first-input',
      type: 'test-input'
    }, {
      id: 'another-input',
      type: 'test-input'
    }]);
    expect(formGroup.get('first-input')).toBeDefined();
    expect(formGroup.get('another-input')).toBeDefined();
    expect(formGroup.get('no-input')).toBeNull();
  });

  it('should create group with sub controls', () => {
    const formGroup = new FormGroup({});
    service.createFromQuestions(formGroup, [{
      id: 'test-group',
      type: 'group',
      children: [{
        id: 'another-input',
        type: 'test-input'
      }]
    }]);
    expect(formGroup.get('no-input')).toBeNull();

    expect(formGroup.get('test-group')).not.toBeNull();
    expect(formGroup.get('test-group')).toBeInstanceOf(FastFormGroup);

    const subGroup = formGroup.get('test-group');

    if (subGroup) {
      expect(subGroup.get('another-input')).not.toBeNull();
    } else {
      throw new Error('subgroup must be defined');
    }
  });

  it('should create array with controls', () => {
    const formGroup = new FormGroup({});
    service.createFromQuestions(formGroup, [{
      id: 'test-array',
      type: 'array',
      children: [{
        id: 'first-input',
        type: 'test-input'
      }, {
        id: 'second-input',
        type: 'test-input'
      }]
    }]);
    expect(formGroup.get('no-input')).toBeNull();
    expect(formGroup.get('test-array')).not.toBeNull();
    expect(formGroup.get('test-array')).toBeInstanceOf(FormArray);

    const formArray: FastFormArray = formGroup.get('test-array') as any;
    expect(formArray.length).toEqual(0);

    formArray.setValue(['as', 'df']);
    expect(formArray.length).toEqual(2);
  });

  describe('actions', () => {
    it('should ignore action items', () => {
      const formGroup = new FormGroup({});
      service.createFromQuestion(formGroup, {
        id: 'test-action',
        type: 'add-button'
      });
      expect(formGroup.get('test-action')).toBeNull();
    });

    it('should ignore action in inline control', () => {
      const formGroup = new FormGroup({});
      service.createFromQuestion(formGroup, {
        id: 'dummy-row',
        type: 'test-row',
        children: [{
          id: 'first-input',
          type: 'test-input'
        }, {
          id: 'test-action',
          type: 'add-button'
        }]
      });
      expect(formGroup.get('first-input')).toBeDefined();
      expect(formGroup.get('first-input')).toBeInstanceOf(FormControl);
      expect(formGroup.get('test-action')).toBeNull();
    });
  });
});
