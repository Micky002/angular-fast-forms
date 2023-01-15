import { ControlDirective } from './control.directive';
import { Injector } from '@angular/core';
import { ViewContainerRefMock } from '../test/mock/view-container-ref.mock';
import { FormRenderServiceMock } from '../test/mock/form-render-service.mock';

describe('ControlDirective', () => {
  it('should create an instance', () => {
    const directive = new ControlDirective(Injector.create({
      name: 'test-injector',
      providers: []
    }), new FormRenderServiceMock(), new ViewContainerRefMock());
    expect(directive).toBeTruthy();
  });
});
