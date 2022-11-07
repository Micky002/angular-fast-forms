import { TestBed } from '@angular/core/testing';

import { BaseFormControlComponent } from '../components/base/base-control.component';
import { Control } from '../control/control.decorator';
import { AFF_CONTROL_COMPONENTS } from '../model';
import { ControlRegistry } from './control/control-registry.service';
import { FormRenderService } from './form-render.service';

@Control({
  type: 'dummy'
})
class DummyControl extends BaseFormControlComponent {
}

describe('FormRenderService', () => {
  let service: FormRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: AFF_CONTROL_COMPONENTS,
        useValue: [DummyControl],
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
