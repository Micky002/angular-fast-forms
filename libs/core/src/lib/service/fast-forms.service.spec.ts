import { TestBed } from '@angular/core/testing';

import { FastFormsService } from './fast-forms.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ControlFactoryService } from './control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { FastFormGroup } from '../control/fast-form-group';

describe('FastFormsService', () => {
  let service: FastFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FastFormsService,
        ControlFactoryService,
        ValidatorFactoryService
      ]
    });
    service = TestBed.inject(FastFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create empty form group', () => {
    const formGroup = service.createDynamicForm([]);
    expect(formGroup).toBeInstanceOf(FastFormGroup);
    expect(formGroup.questions).toHaveLength(0);
  });
});
