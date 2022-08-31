import { ControlFactoryService } from '../service/control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { TestBed } from '@angular/core/testing';
import { FastFormControl } from './fast-form-control';

describe('FastFormControl', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ControlFactoryService,
        ValidatorFactoryService
      ]
    });
  });

  it('should create form control', () => {
    const fastFormControl = new FastFormControl({
      id: 'test',
      type: ''
    });
    expect(fastFormControl).toBeDefined();
  });
});
