import { TestBed } from '@angular/core/testing';

import { UiRegistryService } from './ui-registry.service';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, FastFormControlComponent } from '@ngx-fast-forms/core';

class DummyControl extends FastFormControlComponent {}

describe('UiRegistryService', () => {
  let service: UiRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: DYNAMIC_FORM_CONTROL,
        useValue: {
          type: 'dummy',
          component: DummyControl
        } as DynamicFormDefinition,
        multi: true
      }]
    });
    service = TestBed.inject(UiRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error is duplicated type is registered', () => {
    expect(() => new UiRegistryService([{
      type: 'duplicate',
      component: DummyControl
    }, {
      type: 'duplicate',
      component: DummyControl
    }])).toThrowError();
  });

  it('should find type in registry', () => {
    let definition = service.find('dummy');
    expect(definition).toBeDefined();
    definition = service.find('dummy-undefined');
    expect(definition).toBeUndefined();
  });
});
