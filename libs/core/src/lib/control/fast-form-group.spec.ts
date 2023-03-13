import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { FastFormGroup } from './fast-form-group';
import { FromActionControlInternal as FormActionControlInternal } from '../internal/action/action-control-internal';
import { FormControl } from '@angular/forms';
import { FastFormBuilder } from '../service/fast-form-builder';

describe('FastFormGroup', () => {
  let controlFactory: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FastFormBuilder,
        ControlFactoryService,
        ValidatorFactoryService
      ]
    });
    controlFactory = TestBed.inject(ControlFactoryService);
  });

  it('should throw error when id is duplicated', () => {
    expect(() =>
        new FastFormGroup([{
          id: 'test',
          type: ''
        }, {
          id: 'test',
          type: ''
        }], controlFactory)
    ).toThrowError();
  });

  describe('addControl', () => {

    it('should add action', () => {
      const formGroup = new FastFormGroup([], controlFactory);
      formGroup.addControl('test', new FormActionControlInternal());
      expect(formGroup.controls).toEqual({});
      expect(formGroup.actions).toHaveProperty('test');
      expect(formGroup.get('test')).toBeDefined();
      expect(formGroup.get('test')).toBeInstanceOf(FormActionControlInternal);
    });
  });

  describe('get', () => {
    it('should handle invalid inputs', () => {
      const formGroup = new FastFormGroup([], controlFactory);
      expect(formGroup.get('')).toBeNull();
    });

    it('should return null if control not found', () => {
      const formGroup = new FastFormGroup([], controlFactory);
      const child1 = new FastFormGroup([], controlFactory);
      formGroup.addControl('child1', child1);
      expect(formGroup.get('child1.child2.test-action')).toBeNull();
    });

    it('should get form action from deep group', () => {
      const formGroup = new FastFormGroup([], controlFactory);
      const child1 = new FastFormGroup([], controlFactory);
      const child2 = new FastFormGroup([], controlFactory);
      formGroup.addControl('child1', child1);
      child1.addControl('child2', child2);
      child2.addControl('test-action', new FormActionControlInternal());
      expect(formGroup.get('child1.child2.test-action')).not.toBeNull();
      expect(formGroup.get('child1.child2.test-action')).toBeInstanceOf(FormActionControlInternal);
    });

    it('should get form control from deep group', () => {
      const formGroup = new FastFormGroup([], controlFactory);
      const child1 = new FastFormGroup([], controlFactory);
      const child2 = new FastFormGroup([], controlFactory);
      formGroup.addControl('child1', child1);
      child1.addControl('child2', child2);
      child2.addControl('test-control', new FormControl());
      expect(formGroup.get('child1.child2.test-control')).not.toBeNull();
      expect(formGroup.get('child1.child2.test-control')).toBeInstanceOf(FormControl);
    });
  });
});
