import { TestBed } from '@angular/core/testing';

import { UiRegistryService } from './ui-registry.service';

describe('UiRegistryService', () => {
  let service: UiRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiRegistryService]
    });
    service = TestBed.inject(UiRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
