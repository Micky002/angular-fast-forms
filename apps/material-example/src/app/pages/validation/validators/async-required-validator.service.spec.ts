import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { AsyncRequiredValidatorService } from './async-required-validator.service';

describe('AsyncRequiredValidatorService', () => {
  let service: AsyncRequiredValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AsyncRequiredValidatorService
      ]
    });
    service = TestBed.inject(AsyncRequiredValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
