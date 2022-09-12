import { TestBed } from '@angular/core/testing';

import { AsyncStartWithService } from './async-start-with.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AsyncStartWithService', () => {
  let service: AsyncStartWithService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AsyncStartWithService]
    });
    service = TestBed.inject(AsyncStartWithService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
