import { TestBed } from '@angular/core/testing';

import { CustomRequiredService } from './custom-required.service';

describe('CustomRequiredService', () => {
  let service: CustomRequiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomRequiredService]
    });
    service = TestBed.inject(CustomRequiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
