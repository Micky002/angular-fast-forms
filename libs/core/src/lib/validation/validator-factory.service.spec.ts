import { TestBed } from '@angular/core/testing';

import { ValidatorFactoryService } from './validator-factory.service';
import { AsyncValidatorFn, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseValidator } from './base-validator.service';
import { BaseAsyncValidator, Validator } from '@ngx-fast-forms/core';
import { Injectable } from '@angular/core';
import { FastFormsModule } from '../fast-forms.module';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Validator({
  id: 'test-max-length',
  type: 'sync'
})
@Injectable()
class CustomMaxLengthValidator implements BaseValidator {
  createValidator(args: string[]): ValidatorFn {
    return Validators.maxLength(5);
  }
}

@Validator({
  id: 'test-required',
  type: 'sync'
})
@Injectable()
class CustomRequiredValidator implements BaseValidator {
  createValidator(args: string[]): ValidatorFn {
    return Validators.required;
  }
}

@Validator({
  id: 'test-async-required',
  type: 'async'
})
@Injectable()
class CustomAsyncValidator implements BaseAsyncValidator {

  constructor(private http: HttpClient) {
  }

  createValidator(args: string[]): AsyncValidatorFn {
    return () => this.http.get('/test').pipe(map(value => value ? null : {asyncRequired: true}));
  }
}

describe('ValidatorFactoryService', () => {
  let service: ValidatorFactoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FastFormsModule.forRoot({
          validators: [
            CustomMaxLengthValidator,
            CustomRequiredValidator,
            CustomAsyncValidator
          ]
        })
      ],
      providers: [
        ValidatorFactoryService
      ]
    });
    service = TestBed.inject(ValidatorFactoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if no validators defined', () => {
    const validator = service.createValidators();
    expect(validator).toBeNull();
  });

  it('should add custom validator', () => {
    const validator = service.createValidators({
      customFn: Validators.minLength(5)
    });
    expect(validator).toBeDefined();
    if (validator) {
      const result = validator(new FormControl('asdf'));
      expect(result).toEqual({minlength: {actualLength: 4, requiredLength: 5}});
    } else {
      throw new Error('Validator must be defined');
    }
  });

  it('should add custom validator with string id', () => {
    const validator = service.createValidators({
      custom: 'test-max-length'
    });
    if (validator) {
      const result = validator(new FormControl('This is a test'));
      expect(result).toEqual({maxlength: {actualLength: 14, requiredLength: 5}});
    } else {
      throw new Error('Validator must be defined');
    }
  });

  it('should add multiple validators with string id', () => {
    const validator = service.createValidators({
      custom: ['test-max-length', 'test-required']
    });
    if (validator) {
      const result = validator(new FormControl());
      expect(result).toEqual({required: true});
    } else {
      throw new Error('Validator must be defined');
    }
  });

  it('should add async validator with http dependency', () => {
    const validator = service.createAsyncValidators({
      customAsync: ['test-async-required']
    });
    const control = new FormControl();
    control.setAsyncValidators(validator);
    expect(control.valid).toBeTruthy();

    control.setValue('asdf');
    expect(control.pending).toBeTruthy();
    httpMock.expectOne('/test').flush(false);
    expect(control.pending).toBeFalsy();
    expect(control.valid).toBeFalsy();

    control.setValue('testing');
    expect(control.pending).toBeTruthy();
    httpMock.expectOne('/test').flush(true);
    expect(control.pending).toBeFalsy();
    expect(control.valid).toBeTruthy();
  });

  describe('built in validators', () => {
    it('required', () => {
      const validator = service.createValidators({
        required: true
      });
      expect(validator).toBeDefined();
      if (validator) {
        let result = validator(new FormControl());
        expect(result).toBeDefined();
        expect(result).toEqual({required: true});
        result = validator(new FormControl('test'));
        expect(result).toBeNull();
      } else {
        throw new Error('Validator must be defined');
      }
    });

    it('min', () => {
      const validator = service.createValidators({
        min: 10
      });
      expect(validator).toBeDefined();
      if (validator) {
        let result = validator(new FormControl(15));
        expect(result).toBeNull();
        result = validator(new FormControl(5));
        expect(result).toEqual({min: {actual: 5, min: 10}});
      } else {
        throw new Error('Validator must be defined');
      }
    });

    it('minLength', () => {
      const validator = service.createValidators({
        minLength: 5
      });
      expect(validator).toBeDefined();
      if (validator) {
        let result = validator(new FormControl('this is valid'));
        expect(result).toBeNull();
        result = validator(new FormControl('not'));
        expect(result).toEqual({minlength: {actualLength: 3, requiredLength: 5}});
      } else {
        throw new Error('Validator must be defined');
      }
    });

    it('max', () => {
      const validator = service.createValidators({
        max: 5
      });
      expect(validator).toBeDefined();
      if (validator) {
        let result = validator(new FormControl(2));
        expect(result).toBeNull();
        result = validator(new FormControl(10));
        expect(result).toEqual({max: {actual: 10, max: 5}});
      } else {
        throw new Error('Validator must be defined');
      }
    });

    it('maxLength', () => {
      const validator = service.createValidators({
        maxLength: 5
      });
      expect(validator).toBeDefined();
      if (validator) {
        let result = validator(new FormControl('valid'));
        expect(result).toBeNull();
        result = validator(new FormControl('invalid'));
        expect(result).toEqual({maxlength: {actualLength: 7, requiredLength: 5}});
      } else {
        throw new Error('Validator must be defined');
      }
    });

    it('email', () => {
      const validator = service.createValidators({
        email: true
      });
      expect(validator).toBeDefined();
      if (validator) {
        let result = validator(new FormControl('test@company.at'));
        expect(result).toBeNull();
        result = validator(new FormControl('hello'));
        expect(result).toEqual({email: true});
      } else {
        throw new Error('Validator must be defined');
      }
    });

    it('pattern', () => {
      const validator = service.createValidators({
        pattern: /test.*/
      });
      expect(validator).toBeDefined();
      if (validator) {
        let result = validator(new FormControl('test-stuff'));
        expect(result).toBeNull();
        result = validator(new FormControl('asdf'));
        expect(result).toEqual({pattern: {actualValue: 'asdf', requiredPattern: '/test.*/'}});
      } else {
        throw new Error('Validator must be defined');
      }
    });

    it('should combine required and min validator', () => {
      const validator = service.createValidators({
        required: true,
        min: 5
      });
      expect(validator).toBeDefined();
      if (validator) {
        let result = validator(new FormControl());
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).toEqual({required: true});
        result = validator(new FormControl(0));
        expect(result).toEqual({min: {actual: 0, min: 5}});
      } else {
        throw new Error('Validator must be defined');
      }
    });
  });
});
