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
  createValidator(): ValidatorFn {
    return Validators.maxLength(5);
  }
}

@Validator({
  id: 'test-required',
  type: 'sync'
})
@Injectable()
class CustomRequiredValidator implements BaseValidator {
  createValidator(): ValidatorFn {
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
    expect(control.status).toEqual('PENDING');
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

  it('should print warning if validator id not registered', () => {
    jest.spyOn(console, 'warn');
    const validator = service.createValidators({
      custom: 'not-registered'
    });
    expect(validator).toBeNull();
    expect(console.warn).toBeCalledTimes(1);
  });

  describe('custom validators', () => {
    interface SpecCustomSyncValidator {
      name: string;
      vals: ValidatorFn | Array<ValidatorFn>;
      tests: Array<{
        value?: string | number;
        expect: any;
      }>;
    }

    const testDate: Array<SpecCustomSyncValidator> = [{
      name: 'should add single custom validator',
      vals: Validators.required,
      tests: [
        {expect: {required: true}},
        {value: 'test', expect: null}
      ]
    }, {
      name: 'should add multiple custom validators',
      vals: [Validators.required, Validators.min(5)],
      tests: [
        {expect: {required: true}},
        {value: 5, expect: null},
      ]
    }];

    testDate.forEach(data => {
      it(data.name, () => {
        const validator = service.createValidators({
          customFn: data.vals
        });
        expect(validator).toBeDefined();
        if (validator) {
          data.tests.forEach(test => {
            const result = validator(new FormControl(test.value));
            expect(result).toEqual(test.expect);
          });
        } else {
          throw new Error('Validator must be defined');
        }
      });
    });
  });

  describe('built in validators', () => {

    interface SpecValidator {
      vals: Array<string>;
      tests: Array<{
        value?: string | number;
        expect: any;
      }>;
    }

    const testData: Array<SpecValidator> = [{
      vals: ['required:true'], tests: [
        {expect: {required: true}},
        {value: 'test', expect: null}
      ]
    }, {
      vals: ['min:10'], tests: [
        {expect: null},
        {value: 5, expect: {min: {actual: 5, min: 10}}},
        {value: 15, expect: null},
      ]
    }, {
      vals: ['max:10'], tests: [
        {expect: null},
        {value: 5, expect: null},
        {value: 15, expect: {max: {actual: 15, max: 10}}},
      ]
    }, {
      vals: ['minLength:5'], tests: [
        {expect: null},
        {value: 'not', expect: {minlength: {actualLength: 3, requiredLength: 5}}},
        {value: 'this is valid', expect: null},
      ]
    }, {
      vals: ['maxLength:5'], tests: [
        {expect: null},
        {value: 'not', expect: null},
        {value: 'this is valid', expect: {maxlength: {actualLength: 13, requiredLength: 5}}},
      ]
    }, {
      vals: ['email:true'], tests: [
        {expect: null},
        {value: 'not', expect: {email: true}},
        {value: 'test@company.at', expect: null},
      ]
    }, {
      vals: ['pattern:/test.*/'], tests: [
        {expect: null},
        {value: 'test-stuff', expect: null},
        {value: 'asdf', expect: {pattern: {actualValue: 'asdf', requiredPattern: '/test.*/'}}},
      ]
    }, {
      vals: ['required:true', 'min:5', 'max:20'], tests: [
        {expect: {required: true}},
        {value: 4, expect: {min: {actual: 4, min: 5}}},
        {value: 10, expect: null},
        {value: 22, expect: {max: {actual: 22, max: 20}}},
      ]
    }];

    testData.forEach(data => {
      it(`should create validator [${data.vals}]`, () => {
        const options: any = {};
        data.vals.forEach(val => {
          const [id, value] = val.split(':');
          if (value === 'true') {
            options[id] = true;
          } else if (value === 'false') {
            options[id] = false;
          } else if (value.startsWith('/') && value.endsWith('/')) {
            options[id] = new RegExp(value.substring(1, value.length - 1));
          } else {
            options[id] = Number(value);
          }
        });
        const validator = service.createValidators(options);
        expect(validator).toBeDefined();
        if (validator) {
          data.tests.forEach(test => {
            const result = validator(new FormControl(test.value));
            expect(result).toEqual(test.expect);
          });
        } else {
          throw new Error('Validator must be defined');
        }
      });
    });
  });
});
