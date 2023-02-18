import { TestBed } from '@angular/core/testing';

import { ControlFactoryV2 } from './control-factory-v2.service';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlWrapperKey, hasControlWrapper, WrapperProvider } from './fast-form-builder';

describe('ControlFactoryV2Service', () => {
  let controlFactory: ControlFactoryV2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    controlFactory = TestBed.inject(ControlFactoryV2);
  });

  it('should be created', () => {
    expect(controlFactory).toBeTruthy();
  });

  it('should create simple control', () => {
    const control = controlFactory.control('one', {
      type: 'mat-input',
      updateOn: 'blur'
    });
    expect(control).toBeDefined();
    expect(hasControlWrapper(control)).toBeTruthy();
    const wrapper = (control as WrapperProvider)[ControlWrapperKey];
    expect(wrapper).toBeDefined();
    expect(wrapper.initialState).toEqual('one');
    expect(wrapper.question).toEqual({
      type: 'mat-input',
      updateOn: 'blur'
    });
    expect(() => wrapper.arrayQuestion).toThrowError();
    expect(() => wrapper.groupQuestion).toThrowError();
  });

  it('should create simple group', () => {
    const group = controlFactory.group({type: 'group-v2'}, {
      name: controlFactory.control('Micky', {type: 'mat-input'})
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
      name: ControlWrapperV2.fromControl('Micky', {type: 'mat-input'})
    });
    expect(() => wrapper.arrayQuestion).toThrowError();
  });

  it('should create simple array', () => {
    const array = controlFactory.array({type: 'array-v2'},
        controlFactory.control('entry', {type: 'mat-input'})
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
        ControlWrapperV2.fromControl('entry', {type: 'mat-input'})
    );
    expect(() => wrapper.groupQuestion).toThrowError();
  });

  it('should create control from wrapper', () => {
    const wrapper = ControlWrapperV2.fromControl('', {
      type: 'select',
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
      }, ControlWrapperV2.fromControl('e', {type: 'input'}))
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
          type: 'select',
          validators: Validators.required
        }));
    expect(control.valid).toBeFalsy();
    control.setValue('asdf');
    expect(control.valid).toBeTruthy();
  });

});
