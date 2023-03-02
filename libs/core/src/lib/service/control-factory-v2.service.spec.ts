import { TestBed } from '@angular/core/testing';

import { ControlFactoryV2 } from './control-factory-v2.service';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlDefinition, ControlWrapperKey, hasControlWrapper, WrapperProvider } from './fast-form-builder';
import { Component } from '@angular/core';
import { FastFormsTestingModule } from '../test/fast-forms-testing.module.test-util';
import { TestControlType } from '../test/control-types.test-util';
import { AFF_CONTROL_COMPONENTS } from '../model';
import { FastFormsModule } from '../fast-forms.module';
import { ControlFactory } from '../control/control-factory.decorator';
import { Control } from '../control/control.decorator';

describe('ControlFactoryV2Service', () => {
  let controlFactory: ControlFactoryV2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FastFormsModule,
        FastFormsTestingModule
      ],
      providers: [{
        provide: AFF_CONTROL_COMPONENTS,
        useValue: [
          StringInputComponent
        ],
        multi: true
      }]
    });
    controlFactory = TestBed.inject(ControlFactoryV2);
  });

  it('should be created', () => {
    expect(controlFactory).toBeTruthy();
  });

  it('should create simple control', () => {
    const control = controlFactory.control('one', {
      type: TestControlType.INPUT,
      updateOn: 'blur'
    });
    expect(control).toBeDefined();
    expect(hasControlWrapper(control)).toBeTruthy();
    const wrapper = (control as WrapperProvider)[ControlWrapperKey];
    expect(wrapper).toBeDefined();
    expect(wrapper.initialState).toEqual('one');
    expect(wrapper.question).toEqual({
      type: 'input',
      updateOn: 'blur'
    });
    expect(() => wrapper.arrayQuestion).toThrowError();
    expect(() => wrapper.groupQuestion).toThrowError();
  });

  it('should create simple group', () => {
    const group = controlFactory.group({type: 'group-v2'}, {
      name: controlFactory.control('Micky', {type: TestControlType.INPUT})
    });
    expect(group).toBeDefined();
    expect(hasControlWrapper(group)).toBeTruthy();
    const wrapper = (group as WrapperProvider)[ControlWrapperKey];
    expect(wrapper).toBeDefined();
    expect(wrapper.initialState).toBeNull();
    expect(wrapper.question).toEqual({
      type: 'group-v2'
    });
    expect(wrapper.groupQuestion).toEqual({
      name: ControlWrapperV2.fromControl('Micky', {type: TestControlType.INPUT})
    });
    expect(() => wrapper.arrayQuestion).toThrowError();
  });

  it('should create simple array', () => {
    const array = controlFactory.array({type: 'array-v2'},
        controlFactory.control('entry', {type: TestControlType.INPUT})
    );
    expect(array).toBeDefined();
    expect(hasControlWrapper(array)).toBeTruthy();
    const wrapper = (array as WrapperProvider)[ControlWrapperKey];
    expect(wrapper).toBeDefined();
    expect(wrapper.initialState).toBeNull();
    expect(wrapper.question).toEqual({
      type: 'array-v2'
    });
    expect(wrapper.arrayQuestion).toEqual(
        ControlWrapperV2.fromControl('entry', {type: TestControlType.INPUT})
    );
    expect(() => wrapper.groupQuestion).toThrowError();
  });

  it('should create control from wrapper', () => {
    const wrapper = ControlWrapperV2.fromControl('', {
      type: TestControlType.INPUT,
      validators: Validators.required
    });
    const control = controlFactory.create(wrapper);
    expect(hasControlWrapper(control)).toBeTruthy();
    expect((control as WrapperProvider)[ControlWrapperKey]).toEqual(wrapper);
  });

  it('should create group from wrapper and add entry', () => {
    const wrapper = ControlWrapperV2.fromGroup({
      type: 'group'
    }, {
      names: ControlWrapperV2.fromArray({
        type: 'array'
      }, ControlWrapperV2.fromControl('e', {type: TestControlType.INPUT}))
    });
    const formGroup = controlFactory.create(wrapper);
    expect(formGroup).toBeInstanceOf(FormGroup);
    expect((formGroup as WrapperProvider)[ControlWrapperKey]).toEqual(wrapper);

    expect(formGroup.get('names')).toBeInstanceOf(FormArray);
    const formArray = formGroup.get('names') as FormArray;
    expect(formArray.length).toEqual(0);
    formArray.push(controlFactory.create((formArray as WrapperProvider)[ControlWrapperKey].arrayQuestion));
    expect(formArray.length).toEqual(1);

    expect(formGroup.get(['names', 0])).toBeInstanceOf(FormControl);
  });

  it('should add validators to control', () => {
    const control = controlFactory.create(ControlWrapperV2.fromControl(
        '', {
          type: TestControlType.INPUT,
          validators: Validators.required
        }));
    expect(control.valid).toBeFalsy();
    control.setValue('asdf');
    expect(control.valid).toBeTruthy();
  });

  it('should add validators from definition', () => {
    const control = controlFactory.create(ControlWrapperV2.fromControl(
        '', {
          type: TestControlType.INPUT,
          validation: {
            required: true,
            minLength: 5
          }
        }
    ));
    control.setValue('');
    expect(control.errors).toEqual({required: true});
    control.setValue('at');
    expect(control.errors).toEqual({
      minlength: {
        actualLength: 2,
        requiredLength: 5
      }
    });
  });

  it('should create control from registry factory method', () => {
    const control = controlFactory.control({value: 'test', disabled: true},
        {
          type: 'string-input',
          validators: Validators.minLength(5)
        });
    expect(control).toBeInstanceOf(StringFormControl);
    expect(control.value).toEqual('test');
    expect(control.disabled).toEqual(true);
    control.enable();
    expect(control.errors).toEqual({
      minlength: {
        actualLength: 4,
        requiredLength: 5
      }
    });
  });
});

@Control({
  type: 'string-input'
})
@Component({
  standalone: true,
  template: ``
})
class StringInputComponent {

  @ControlFactory()
  static createControl(def: ControlDefinition) {
    return new StringFormControl(def.defaultValue, {
      validators: def.validators
    });
  }
}

class StringFormControl extends FormControl {

}


