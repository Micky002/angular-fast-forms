import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { FastFormArray } from './fast-form-array';
import { FastFormsTestingModule } from '../test/fast-forms-testing.module.test-util';
import { TestControlType } from '../test/control-types.test-util';

describe('FastFormArray', () => {
  let controlFactory: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FastFormsTestingModule
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
      type: TestControlType.INPUT
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
      type: TestControlType.INPUT
    }, controlFactory);
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second', 'third']);
    expect(formArray.length).toEqual(3);

    formArray.copyRow(1);
    expect(formArray.length).toEqual(4);
    expect(formArray.value).toEqual(['first', 'second', 'second', 'third']);
  });

  it('should keep disabled rows', () => {
    const array = new FastFormArray({id: 'test', type: TestControlType.INPUT}, controlFactory);
    array.patchValue([{test: '1'}, {test: '2'}]);
    expect(array.controls).toHaveLength(2);
    array.controls[0].disable();
    array.copyRow(1);
    expect(array.controls).toHaveLength(3);
    expect(array.controls[0].disabled).toBeTruthy();
    expect(array.controls[1].disabled).toBeFalsy();
    expect(array.controls[2].disabled).toBeFalsy();

  });

  it('should remove row at index', () => {
    const formArray = new FastFormArray({
      id: 'test',
      type: TestControlType.INPUT
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
      type: TestControlType.INPUT
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
