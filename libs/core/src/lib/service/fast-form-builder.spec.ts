import { TestBed } from '@angular/core/testing';

import { ControlWrapperKey, FastFormBuilder, hasControlWrapper, WrapperProvider } from './fast-form-builder';

describe('FormBuilderService', () => {
  let fb: FastFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FastFormBuilder
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

  // it('should derive definition of control', () => {
  //   const definition = fb.deriveDefinition(fb.control(null, {type: 'mat-input', label: 'test'}));
  //   expect(definition).toEqual({type: 'mat-input', label: 'test'});
  // });
  //
  // it('should derive definition of group', () => {
  //   const definition = fb.deriveDefinition(fb.group({}, {
  //     name: fb.control(null, {type: 'mat-input', label: 'Name'}),
  //     description: fb.control(null, {type: 'mat-input', label: 'Description'})
  //   }));
  //   expect(definition).toEqual({
  //     name: {type: 'mat-input', label: 'Name'},
  //     description: {type: 'mat-input', label: 'Description'}
  //   });
  // });
  //
  // it('should derive definition of array', () => {
  //   const definition = fb.deriveDefinition(fb.array({},
  //       fb.control(null, {type: 'mat-input', label: 'Name'})
  //   ));
  //   expect(definition).toEqual([{type: 'array'}, {label: 'Name', type: 'mat-input'}]);
  // });
});
