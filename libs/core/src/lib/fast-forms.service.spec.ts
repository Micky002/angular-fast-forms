import { TestBed } from '@angular/core/testing';

import { FastFormsService } from './fast-forms.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControlFactoryService } from './control/form-control-factory.service';
import { ValidatorFactoryService } from './validation/validator-factory.service';

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
        ValidatorFactoryService
      ]
    });
    service = TestBed.inject(FastFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});