import { TestBed } from '@angular/core/testing';

import { FastFormBuilder } from './fast-form-builder';

describe('FormBuilderService', () => {
  let cb: FastFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FastFormBuilder
      ]
    });
    cb = TestBed.inject(FastFormBuilder);
  });

  it('should be created', () => {
    expect(cb).toBeTruthy();
  });

  it('should derive definition of control', () => {
    const definition = cb.deriveDefinition(cb.control(null, {type: 'mat-input', label: 'test'}));
    expect(definition).toEqual({type: 'mat-input', label: 'test'});
  });

  it('should derive definition of group', () => {
    const definition = cb.deriveDefinition(cb.group({}, {
      name: cb.control(null, {type: 'mat-input', label: 'Name'}),
      description: cb.control(null, {type: 'mat-input', label: 'Description'})
    }));
    expect(definition).toEqual({
      name: {type: 'mat-input', label: 'Name'},
      description: {type: 'mat-input', label: 'Description'}
    });
  });

  it('should derive definition of array', () => {
    const definition = cb.deriveDefinition(cb.array({},
        cb.control(null, {type: 'mat-input', label: 'Name'})
    ));
    expect(definition).toEqual({
      name: {type: 'mat-input', label: 'Name'},
      description: {type: 'mat-input', label: 'Description'}
    });
  });
});
