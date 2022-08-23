import { TestBed } from '@angular/core/testing';

import { ValidatorFactoryService } from './validator-factory.service';
import { FormControl, Validators } from '@angular/forms';
import {
  AsyncValidatorRegistration,
  registerAsyncValidator,
  registerAsyncValidatorWithDeps,
  registerValidator
} from './validation.model';
import { HttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CUSTOM_ASYNC_VALIDATOR } from '@ngx-fast-forms/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { map } from 'rxjs';

describe('ValidatorFactoryService', () => {
  let service: ValidatorFactoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ValidatorFactoryService,
        registerValidator('test-max-length', Validators.maxLength(5)),
        registerValidator('test-required', Validators.required),
        {
          provide: CUSTOM_ASYNC_VALIDATOR,
          deps: [HttpClient],
          useFactory: (http: HttpClient) => {
            return {
              id: 'test-async-required',
              validator: () => http.get('/test').pipe(map(value => value ? null : {asyncRequired: true}))
            } as AsyncValidatorRegistration
          },
          multi: true
        } as Provider
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

  it('should create required validator', () => {
    const validator = service.createValidators({
      required: true
    });
    const result = validator!(new FormControl());
    expect(result).toBeDefined();
    expect(result).toEqual({required: true});
  });

  it('should create required and min validator', () => {
    const validator = service.createValidators({
      required: true,
      min: 5
    });
    let result = validator!(new FormControl());
    expect(result).toBeDefined();
    expect(result).toEqual({required: true});
    result = validator!(new FormControl(0));
    expect(result).toEqual({min: {actual: 0, min: 5}});
  });

  it('should add custom validator', () => {
    const validator = service.createValidators({
      customFn: Validators.minLength(5)
    });
    const result = validator!(new FormControl('asdf'));
    expect(result).toEqual({minlength: {actualLength: 4, requiredLength: 5}})
  });

  it('should add custom validator with string id', () => {
    const validator = service.createValidators({
      custom: 'test-max-length'
    });
    const result = validator!(new FormControl('This is a test'));
    expect(result).toEqual({maxlength: {actualLength: 14, requiredLength: 5}})
  });

  it('should add multiple validators with string id', () => {
    const validator = service.createValidators({
      custom: ['test-max-length', 'test-required']
    });
    const result = validator!(new FormControl());
    expect(result).toEqual({required: true})
  });

  it('should add async validator with http dependency', () => {
    const validator = service.createAsyncValidators({
      customAsync: ['test-async-required']
    });
    let control = new FormControl();
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
});
