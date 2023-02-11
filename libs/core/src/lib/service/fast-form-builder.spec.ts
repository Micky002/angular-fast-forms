import { TestBed } from '@angular/core/testing';

import { FastFormBuilder } from './fast-form-builder';

describe('FormBuilderService', () => {
  let service: FastFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastFormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
