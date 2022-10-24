import { TestBed } from '@angular/core/testing';

import { UiRegistryService } from './ui-registry.service';
import { ControlRegistry } from '../internal/control/control-registry.service';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from '../model';

class DummyControl extends BaseFormControlComponent {
}

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
    expect(() => new UiRegistryService(new ControlRegistry(), null as any, [{
      type: 'duplicate',
      component: DummyControl
    }, {
      type: 'duplicate',
      component: DummyControl
    }])).toThrowError();
  });

  it('should find type in registry', () => {
    let definition = service.findControl('dummy');
    expect(definition).not.toBeNull();
    definition = service.findControl('dummy-undefined');
    expect(definition).toBeNull();
  });
});
