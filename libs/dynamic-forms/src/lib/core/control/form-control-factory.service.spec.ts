import { TestBed } from '@angular/core/testing';

import { FormControlFactoryService } from './form-control-factory.service';

describe('FormControlFactoryService', () => {
  let service: FormControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormControlFactoryService
      ]
    });
    service = TestBed.inject(FormControlFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
