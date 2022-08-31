import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { UiRegistryService } from '../service/ui-registry.service';
import { FastFormArray } from './fast-form-array';

describe('FastFormArray', () => {
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
  });

  it('should create form array', () => {
    const fastFormArray = new FastFormArray({
      id: 'test',
      type: ''
    }, controlFactory);
    expect(fastFormArray).toBeDefined();
  });
});
