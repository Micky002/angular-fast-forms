import { FastFormsGroup } from '@ngx-fast-forms/core';
import { FormControlFactoryService } from './control/form-control-factory.service';
import { ValidatorFactoryService } from './validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';

describe('FastFormsGroup', () => {
  let controlFactory: FormControlFactoryService;
  let validatorFactory: ValidatorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormControlFactoryService,
        ValidatorFactoryService
      ]
    });
    controlFactory = TestBed.inject(FormControlFactoryService);
    validatorFactory = TestBed.inject(ValidatorFactoryService);
  })

  it('should throw error when id is duplicated', () => {
    expect(() =>
      new FastFormsGroup([{
        id: 'test',
        type: ''
      }, {
        id: 'test',
        type: ''
      }], controlFactory, validatorFactory)
    ).toThrowError();
  });
});
