import { FastFormGroup } from '@ngx-fast-forms/core';
import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { UiRegistryService } from '../service/ui-registry.service';

describe('FastFormGroup', () => {
  let controlFactory: ControlFactoryService;
  let validatorFactory: ValidatorFactoryService;
  let uiRegistry: UiRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ControlFactoryService,
        ValidatorFactoryService
      ]
    });
    controlFactory = TestBed.inject(ControlFactoryService);
    validatorFactory = TestBed.inject(ValidatorFactoryService);
    uiRegistry = TestBed.inject(UiRegistryService);
  })

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
});
