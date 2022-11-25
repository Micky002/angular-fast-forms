import { TestBed } from '@angular/core/testing';

import { BaseFormControlComponent } from '../components/base/base-control.component';
import { AFF_CONTROL_COMPONENTS } from '../model';
import { FormRenderService } from './form-render.service';
import { Control } from '@ngx-fast-forms/core';
import { Provider } from '@angular/core';

@Control({
  type: 'dummy'
})
class DummyControl extends BaseFormControlComponent {
}

describe('FormRenderService', () => {
  let service: FormRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AFF_CONTROL_COMPONENTS,
          useValue: [
            DummyControl
          ],
          multi: true
        } as Provider
      ]
    });
    service = TestBed.inject(FormRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
