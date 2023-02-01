import { TestBed } from '@angular/core/testing';

import { ControlFactoryService } from './control-factory.service';
import { Component, Provider } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { FastFormArray } from '../control/fast-form-array';
import { ActionControl } from '../actions/actions.decorator';
import { Control } from '../control/control.decorator';
import { AFF_CONTROL_COMPONENTS } from '../model';
import { FastFormGroup } from '../control/fast-form-group';
import { FastFormArrayComponent } from '../components/fast-form-array/fast-form-array.component';
import { FastFormGroupComponent } from '../components';


@Control({
  type: 'test-input'
})
@Component({
  selector: 'aff-testing-control',
  template: ''
})
class DummyControlComponent {

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
          provide: AFF_CONTROL_COMPONENTS,
          multi: true,
          useValue: [
            DummyActionComponent,
            DummyRowComponent,
            DummyControlComponent,
            FastFormArrayComponent,
            FastFormGroupComponent
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
    const control = service.createFormControl({type: 'test-control', id: 'test'});
    expect(control).toBeDefined();
  });

  // it('should create control from registered factory', () => {
  //   service.componentRegistry = [{
  //     type: 'test-control',
  //     component: DummyControlComponent,
  //     controlFactory: () => new FormControl('initial-state')
  //   }];
  //   const control = service.createFormControl({type: 'test-control', id: 'test'});
  //   expect(control).toBeDefined();
  //   expect(control.value).toEqual('initial-state');
  // });

  // it('should create control with initial default value', () => {
  //   service.componentRegistry = [{
  //     type: 'test-control',
  //     component: DummyControlComponent
  //   }];
  //   const control = service.createFormControl({
  //     type: 'test-control',
  //     id: 'test',
  //     defaultValue: 'my custom default'
  //   });
  //   expect(control).toBeDefined();
  //   expect(control.value).toEqual('my custom default');
  // });

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
    const formGroup = new FormRecord({});
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

    const formArray = formGroup.get('test-array') as FastFormArray;
    expect(formArray).toBeInstanceOf(FastFormArray);
    expect(formArray.length).toEqual(0);

    formArray.setValue(['as', 'df']);
    expect(formArray.length).toEqual(2);
  });

  it('should disable single control', () => {
    const formGroup = new FormGroup({});
    service.createFromQuestions(formGroup, [{
      id: 'disabled-input',
      type: 'test-input',
      disabled: true
    }, {
      id: 'enabled-input',
      type: 'test-input'
    }]);

    const enabledInput = formGroup.get('enabled-input');
    const disabledInput = formGroup.get('disabled-input');
    expect(enabledInput?.disabled).toBe(false);
    expect(disabledInput?.disabled).toBe(true);
  });

  it('should disable all controls on disabled form group', () => {
    const formGroup = new FormGroup({});
    service.createFromQuestions(formGroup, [{
      id: 'test-disabled-group',
      type: 'group',
      disabled: true,
      children: [{
        id: 'disabled-input-1',
        type: 'test-input'
      }, {
        id: 'disabled-input-2',
        type: 'test-input'
      }]
    }]);

    const group = formGroup.get('test-disabled-group');
    expect(group?.disabled).toEqual(true);
    expect(group).toBeInstanceOf(FastFormGroup);

    const control1 = group?.get('disabled-input-1');
    const control2 = group?.get('disabled-input-2');
    expect(control1?.disabled).toEqual(true);
    expect(control2?.disabled).toEqual(true);
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

    it('should print warning if action is added to standard form', () => {
      jest.spyOn(console, 'warn');
      const formGroup = new FormGroup({});
      service.createFromQuestion(formGroup, {
        id: 'test-action',
        type: 'add-button'
      });
      expect(formGroup.get('test-action')).toBeNull();
      expect(console.warn).toBeCalledTimes(1);
      expect(console.warn).lastCalledWith('Cannot add action to standard reactive form.');
    });
  });
});
