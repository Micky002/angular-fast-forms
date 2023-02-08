import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { FastFormArray } from './fast-form-array';
import { DummyInputModule } from '../test/dummy-input.module.test-util';
import { ControlFactoryServiceImpl } from '../service/control-factory-impl.service';

describe('FastFormArray', () => {
  let controlFactory: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DummyInputModule
      ],
      providers: [
        {
          provide: ControlFactoryService,
          useClass: ControlFactoryServiceImpl
        },
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

  it('should copy row at index', () => {
    const formArray = new FastFormArray({
      id: 'test',
      type: 'dummy-input'
    }, controlFactory);
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second', 'third']);
    expect(formArray.length).toEqual(3);

    formArray.copyRow(1);
    expect(formArray.length).toEqual(4);
    expect(formArray.value).toEqual(['first', 'second', 'second', 'third']);
  });

  it('should remove row at index', () => {
    const formArray = new FastFormArray({
      id: 'test',
      type: 'dummy-input'
    }, controlFactory);
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second', 'third']);
    expect(formArray.length).toEqual(3);

    formArray.removeAt(1);
    expect(formArray.length).toEqual(2);
    expect(formArray.value).toEqual(['first', 'third']);
  });

  it('should add row at index', () => {
    const formArray = new FastFormArray({
      id: 'test',
      type: 'dummy-input'
    }, controlFactory);
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second']);
    expect(formArray.length).toEqual(2);

    formArray.addRow(0);
    expect(formArray.length).toEqual(3);
    expect(formArray.value).toEqual([null, 'first', 'second']);

    formArray.addRow(2);
    expect(formArray.length).toEqual(4);
    expect(formArray.value).toEqual([null, 'first', null, 'second']);
  });
});
