import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { FastFormArray } from './fast-form-array';
import { DummyInputModule } from '../test/dummy-input.module.test-util';

describe('FastFormArray', () => {
  let controlFactory: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DummyInputModule
      ],
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
      type: 'input'
    }, controlFactory);
    expect(fastFormArray).toBeDefined();
  });

  it('should update control count on setValue and patchValue', () => {
    const formArray = new FastFormArray({
      id: 'test',
      type: 'dummy-input'
    }, controlFactory);
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second', 'third']);
    expect(formArray.length).toEqual(3);

    formArray.patchValue(['first']);
    expect(formArray.length).toEqual(1);
  });
});
