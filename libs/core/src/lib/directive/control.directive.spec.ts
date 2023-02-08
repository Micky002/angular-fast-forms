import { ControlDirective, ControlNameDirective } from './control.directive';
import { Injector } from '@angular/core';
import { ViewContainerRefMock } from '../test/mock/view-container-ref.mock';
import { FormRenderServiceMock } from '../test/mock/form-render-service.mock';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormRenderService } from '../internal/base-form-renderer.service';
import { FastFormControl } from '../control/fast-form-control';
import spyOn = jest.spyOn;

describe('ControlDirective', () => {
  it('should create an instance', () => {
    const directive = new ControlDirective(Injector.create({
      name: 'test-injector',
      providers: []
    }), new FormRenderServiceMock(), new ViewContainerRefMock());
    expect(directive).toBeTruthy();
  });
});

describe('ControlNameDirective', () => {
  let directive: ControlNameDirective;
  let formRenderer: FormRenderService;

  beforeEach(() => {
    formRenderer = new FormRenderServiceMock();
    const groupDirective = new FormGroupDirective([], []);
    jest.spyOn(groupDirective, 'control', 'get').mockReturnValue(
        new FormGroup({
          name: new FastFormControl(null, {
            question: {
              type: 'mat-input'
            }
          })
        })
    );
    directive = new ControlNameDirective(Injector.create({
      name: 'test-injector',
      providers: []
    }), groupDirective, formRenderer, new ViewContainerRefMock());
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should render control', () => {
    spyOn(formRenderer, 'renderControl').mockImplementation();
    directive.fastFormControlName = 'name';
    directive.ngOnInit();
    expect(formRenderer.renderControl).toHaveBeenCalledTimes(1);

    directive.fastFormControlName = 'notIncluded';
    directive.ngOnInit();
    expect(formRenderer.renderControl).toHaveBeenCalledTimes(1);
  });
});
