import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { AsyncStartWithService } from './async-start-with.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AsyncStartWithService', () => {
  let service: AsyncStartWithService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [AsyncStartWithService]
    });
    service = TestBed.inject(AsyncStartWithService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
