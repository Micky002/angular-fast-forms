import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { CustomStartWithService } from './custom-start-with.service';

describe('CustomStartWithService', () => {
  let service: CustomStartWithService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomStartWithService]
    });
    service = TestBed.inject(CustomStartWithService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
