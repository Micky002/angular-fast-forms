import { FastFormsGroup } from '@ngx-fast-forms/core';
import { FormControlFactoryService } from '../service/form-control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { UiRegistryService } from '../service/ui-registry.service';

describe('FastFormsGroup', () => {
  let controlFactory: FormControlFactoryService;
  let validatorFactory: ValidatorFactoryService;
  let uiRegistry: UiRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormControlFactoryService,
        ValidatorFactoryService,
        UiRegistryService
      ]
    });
    controlFactory = TestBed.inject(FormControlFactoryService);
    validatorFactory = TestBed.inject(ValidatorFactoryService);
    uiRegistry = TestBed.inject(UiRegistryService);
  })

  it('should throw error when id is duplicated', () => {
    expect(() =>
      new FastFormsGroup([{
        id: 'test',
        type: ''
      }, {
        id: 'test',
        type: ''
      }], controlFactory, validatorFactory, uiRegistry)
    ).toThrowError();
  });
});
