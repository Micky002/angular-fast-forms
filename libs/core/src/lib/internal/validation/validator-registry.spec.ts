import { ValidatorRegistry } from './validator-registry';
import { TestBed } from '@angular/core/testing';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { FastFormsModule } from '../../fast-forms.module';
import { InternalValidator } from './models';
import { VALIDATORS } from '../token';
import { ValidatorDefinition } from './validator-definition.util';
import { BaseAsyncValidator } from '../../validation/base-async-validator.service';
import { Validator } from '../../validation/validation.decorator';
import { BaseValidator } from '../../validation/base-validator.service';


class DummyInvalidAsyncValidator implements BaseAsyncValidator {
  createValidator(): AsyncValidatorFn {
    return () => of(null);
  }
}

@Validator({
  id: 'dummy-async',
  type: 'async'
})
@Injectable()
class DummyAsyncValidator implements BaseAsyncValidator {
  createValidator(): AsyncValidatorFn {
    return () => {
      return new Promise(resolve => {
        resolve({
          required: true
        });
      });
    };
  }
}

@Validator({
  id: 'dummy-sync',
  type: 'sync'
})
@Injectable()
class DummySyncValidator implements BaseValidator {

  createValidator(): ValidatorFn {
    return () => {
      return {
        required: true
      };
    };
  }
}


describe('ValidatorRegistry', () => {
  let injector: Injector;
  let registerdValidators: Array<Array<InternalValidator>>;
  let registry: ValidatorRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FastFormsModule.forRoot({
          validators: [
            DummyAsyncValidator,
            DummySyncValidator
          ]
        })
      ],
      providers: []
    });
    injector = TestBed.inject(Injector);
    registerdValidators = TestBed.inject(VALIDATORS);
  });

  describe('valid validators', () => {
    beforeEach(() => {
      registry = new ValidatorRegistry(injector, registerdValidators);
    });

    it('hasAsyncValidator', () => {
      expect(registry.hasAsyncValidator('dummy-async')).toBeTruthy();
      expect(registry.hasAsyncValidator('id')).toBeFalsy();
      expect(registry.hasAsyncValidator('dummy-sync')).toBeFalsy();
    });

    it('getAsyncValidator', async () => {
      const validator = registry.getAsyncValidator(new ValidatorDefinition('dummy-async'));
      expect(validator).toBeDefined();
      const validationResult = await (validator(new FormControl()) as Promise<{ required: boolean }>);
      expect(validationResult).toBeDefined();
      expect(validationResult).toHaveProperty('required');
      expect(validationResult['required']).toBeTruthy();
    });

    it('getAsyncValidator - missing validator', async () => {
      expect(() => registry.getAsyncValidator(new ValidatorDefinition('not-registerd'))).toThrowError();
    });

    it('hasSyncValidator', () => {
      expect(registry.hasSyncValidator('dummy-sync')).toBeTruthy();
      expect(registry.hasSyncValidator('id')).toBeFalsy();
      expect(registry.hasSyncValidator('dummy-async')).toBeFalsy();
    });

    it('getSyncValidator', () => {
      const validator = registry.getSyncValidator(new ValidatorDefinition('dummy-sync'));
      expect(validator).toBeDefined();
      const validationResult = validator(new FormControl()) as { required: boolean };
      expect(validationResult).toBeDefined();
      expect(validationResult).toHaveProperty('required');
      expect(validationResult['required']).toBeTruthy();
    });

    it('getSyncValidator - missing validator', async () => {
      expect(() => registry.getSyncValidator(new ValidatorDefinition('not-registerd'))).toThrowError();
    });
  });

  describe('invalid validators', () => {
    it('validator with no @Validator decorator', () => {
      expect(() => new ValidatorRegistry(injector, [[DummyInvalidAsyncValidator as any]])).toThrowError();
    });
  });
});
