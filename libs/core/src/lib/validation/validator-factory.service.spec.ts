import { TestBed } from '@angular/core/testing';

import { ValidatorFactoryService } from './validator-factory.service';
import { Validators } from "@angular/forms";

describe('ValidatorFactoryService', () => {
  let service: ValidatorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorFactoryService]
    });
    service = TestBed.inject(ValidatorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create required validator', () => {
    const validators = service.createValidators({
      required: true
    });
    expect(validators).toHaveLength(1);
    expect(validators[0]).toEqual(Validators.required);
  });

  it('should create required and min validator', () => {
    const validators = service.createValidators({
      required: true,
      min: 5
    });
    expect(validators).toHaveLength(2);
  });

  it('should all validators', () => {
    const validators = service.createValidators({
      required: true,
      min: 5,
      max: 10
    });
    expect(validators).toHaveLength(3);
  });
});
