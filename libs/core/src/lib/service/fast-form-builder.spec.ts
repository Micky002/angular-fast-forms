import { TestBed } from '@angular/core/testing';
import { FastFormsModule } from '../fast-forms.module';

import { ControlWrapperKey, FastFormBuilder, hasControlWrapper, WrapperProvider } from './fast-form-builder';
import { TestControlType } from '../test/control-types.test-util';
import { DummyInputComponent } from '../test/dummy-input.test-util';
import { FormArray, FormControl } from '@angular/forms';

describe(FastFormBuilder.name, () => {
  let fb: FastFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FastFormsModule.forRoot({
          controls: [DummyInputComponent]
        })
      ]
    });
    fb = TestBed.inject(FastFormBuilder);
  });

  it('should be created', () => {
    expect(fb).toBeTruthy();
  });

  it('should set default group', () => {
    const group = fb.group({});
    expect(hasControlWrapper(group)).toBeTruthy();
    const wrapper = (group as WrapperProvider)[ControlWrapperKey];
    expect(wrapper.question.type).toEqual('group-v2');
  });

  it('should set default array', () => {
    const array = fb.array({});
    expect(hasControlWrapper(array)).toBeTruthy();
    const wrapper = (array as WrapperProvider)[ControlWrapperKey];
    expect(wrapper.question.type).toEqual('array-v2');
  });

  it('should create control', () => {
    const control = fb.dynamicControl('initial value', {type: TestControlType.INPUT});
    expect(control).toBeDefined();
    expect(control.value).toEqual('initial value');
  });

  it('should create new array entry', () => {
    const array = fb.array({}, fb.dynamicControl(null, {type: TestControlType.INPUT}));
    expect(array.length).toEqual(0);
    const entry = fb.newArrayEntry(array);
    expect(entry).toBeDefined();
    array.push(entry);
    expect(array.length).toEqual(1);
  });

  it('should validate array question is created via fast form builder', () => {
    expect(() => fb.array({}, new FormControl())).toThrowError();
  });

  it('should validate array entry is created from control with wrapper', () => {
    expect(() => fb.newArrayEntry(new FormArray<any>([]))).toThrowError();
  });
});
