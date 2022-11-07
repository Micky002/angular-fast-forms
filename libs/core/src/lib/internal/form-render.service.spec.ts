import { TestBed } from '@angular/core/testing';

import { FormRenderService } from './form-render.service';
import { ControlRegistry } from './control/control-registry.service';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from '../model';

class DummyControl extends BaseFormControlComponent {
}

describe('FormRenderService', () => {
  let service: FormRenderService;

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
    service = TestBed.inject(FormRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error is duplicated type is registered', () => {
    expect(() => new FormRenderService(new ControlRegistry(), null as any, [{
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
