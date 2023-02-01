import { TestBed } from '@angular/core/testing';

import { FastFormsService } from './fast-forms.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ControlFactoryService } from './control-factory.service';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { FastFormGroup } from '../control/fast-form-group';
import { ControlRegistry } from '../internal/control/control-registry.service';
import { FastFormControl } from '../control/fast-form-control';
import { DummyInputModule } from '../test/dummy-input.module.test-util';


describe('FastFormsService', () => {
  let service: FastFormsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DummyInputModule
      ],
      providers: [
        FastFormsService,
        ControlFactoryService,
        ValidatorFactoryService,
        ControlRegistry
      ]
    });
    service = TestBed.inject(FastFormsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create empty form group', () => {
    const formGroup = service.createDynamicForm([]);
    expect(formGroup).toBeInstanceOf(FastFormGroup);
    expect(formGroup.questions).toHaveLength(0);
  });

  it('should create single control', () => {
    const control = service.control({
      type: 'dummy-input'
    });
    expect(control).toBeInstanceOf(FastFormControl);
  });

  it('should create group from http request', () => {
    const group = service.createHttpForm('/test-endpoint');
    http.expectOne('/test-endpoint').flush([{
      id: 'name',
      type: 'dummy-input'
    }]);
    expect(group).toBeInstanceOf(FastFormGroup);
    expect(group.get('name')).not.toBeNull();
    expect(group.get('name')).toBeInstanceOf(FastFormControl);
    http.verify();
  });
});
