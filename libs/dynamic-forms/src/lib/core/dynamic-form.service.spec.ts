import { TestBed } from '@angular/core/testing';

import { DynamicFormService } from './dynamic-form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControlFactoryService } from './control/form-control-factory.service';
import { ValidatorFactoryService } from './validation/validator-factory.service';

describe('DynamicFormService', () => {
  let service: DynamicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DynamicFormService,
        FormControlFactoryService,
        ValidatorFactoryService
      ]
    });
    service = TestBed.inject(DynamicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
