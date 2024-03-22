import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { FastFormArray } from './fast-form-array';
import { FastFormsTestingModule } from '../test/fast-forms-testing.module.test-util';
import { TestControlType } from '../test/control-types.test-util';

describe(FastFormArray.name, () => {
  let controlFactory: ControlFactoryService;
  let formArray: FastFormArray;

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

    formArray = new FastFormArray({
      id: 'test',
      type: TestControlType.INPUT
    }, controlFactory);
  });

  it('should create form array', () => {
    expect(formArray).toBeDefined();
  });

  it('should update control count on setValue and patchValue', () => {
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second', 'third']);
    expect(formArray.length).toEqual(3);

    formArray.patchValue(['first']);
    expect(formArray.length).toEqual(1);
  });

  it('should copy row at index', () => {
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second', 'third']);
    formArray.controls[2].disable();
    expect(formArray.length).toEqual(3);

    formArray.copyRow(1);
    expect(formArray.length).toEqual(4);
    expect(formArray.controls[2].enabled).toBeTruthy();
    expect(formArray.controls[3].enabled).toBeFalsy();
    expect(formArray.getRawValue()).toEqual(['first', 'second', 'second', 'third']);
  });

  it('should copy and insert after', () => {
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second']);

    formArray.copyRow(1, {insertAfter: -1});
    expect(formArray.length).toEqual(3);
    expect(formArray.getRawValue()).toEqual(['second', 'first', 'second']);

    formArray.copyRow(1, {insertAfter: 2});
    expect(formArray.length).toEqual(4);
    expect(formArray.getRawValue()).toEqual(['second', 'first', 'second', 'first']);
  });

  it('should keep disabled rows', () => {
    formArray.patchValue([{test: '1'}, {test: '2'}]);
    expect(formArray.controls).toHaveLength(2);
    formArray.controls[0].disable();
    formArray.copyRow(1);
    expect(formArray.controls).toHaveLength(3);
    expect(formArray.controls[0].disabled).toBeTruthy();
    expect(formArray.controls[1].disabled).toBeFalsy();
    expect(formArray.controls[2].disabled).toBeFalsy();
  });

  it('should pass emit event option on copy', () => {
    formArray.patchValue([{test: '1'}]);
    const mockFn = jest.fn();
    formArray.valueChanges.subscribe(() => mockFn());
    formArray.copyRow(0, {emitEvent: false});
    expect(mockFn).toBeCalledTimes(0);
    formArray.copyRow(0);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('should remove row at index', () => {
    expect(formArray.length).toEqual(0);

    formArray.setValue(['first', 'second', 'third']);
    expect(formArray.length).toEqual(3);

    formArray.removeAt(1);
    expect(formArray.length).toEqual(2);
    expect(formArray.value).toEqual(['first', 'third']);
  });

  it('should add row at index', () => {
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
