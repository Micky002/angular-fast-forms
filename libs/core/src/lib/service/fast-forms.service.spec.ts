import { TestBed } from '@angular/core/testing';

import { FastFormsService } from './fast-forms.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControlFactoryService } from './form-control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { UiRegistryService } from './ui-registry.service';

describe('FastFormsService', () => {
  let service: FastFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FastFormsService,
        FormControlFactoryService,
        ValidatorFactoryService,
        UiRegistryService
      ]
    });
    service = TestBed.inject(FastFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
