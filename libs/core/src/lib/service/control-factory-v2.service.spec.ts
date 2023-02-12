import { TestBed } from '@angular/core/testing';

import { ControlFactoryV2 } from './control-factory-v2.service';

describe('ControlFactoryV2Service', () => {
  let service: ControlFactoryV2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlFactoryV2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
