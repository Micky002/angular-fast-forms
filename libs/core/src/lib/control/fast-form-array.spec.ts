import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { FastFormArray } from './fast-form-array';

describe('FastFormArray', () => {
  let controlFactory: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ControlFactoryService,
        ValidatorFactoryService
      ]
    });
    controlFactory = TestBed.inject(ControlFactoryService);
  });

  it('should create form array', () => {
    const fastFormArray = new FastFormArray({
      id: 'test',
      type: ''
    }, controlFactory);
    expect(fastFormArray).toBeDefined();
  });
});
