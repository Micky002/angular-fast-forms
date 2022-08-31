import { FastFormGroup } from '@ngx-fast-forms/core';
import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';

describe('FastFormGroup', () => {
  let controlFactory: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ControlFactoryService,
        ValidatorFactoryService
      ]
    });
    controlFactory = TestBed.inject(ControlFactoryService);
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
