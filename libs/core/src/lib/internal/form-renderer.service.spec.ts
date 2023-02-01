import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AFF_CONTROL_COMPONENTS, Question } from '../model';
import { Component, Injector, Provider, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlRegistry } from './control/control-registry.service';
import { By } from '@angular/platform-browser';
import { Control } from '../control/control.decorator';
import { ControlFactoryService } from '../service/control-factory.service';
import { FastFormControl } from '../control/fast-form-control';
import { FormRenderService } from './base-form-renderer.service';

@Control({
  type: 'dummy'
})
@Component({
  template: '<p data-test-id="dummy-test">Hallo</p>'
})
class DummyControlComponent {
}

describe('FormRenderService', () => {
  let service: FormRenderService;
  let controlFactory: ControlFactoryService;
  let controlRegistry: ControlRegistry;
  let fixture: ComponentFixture<DummyRenderComponent>;
  let component: DummyRenderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyRenderComponent
      ],
      providers: [
        ControlRegistry,
        ControlFactoryService,
        {
          provide: AFF_CONTROL_COMPONENTS,
          useValue: [
            DummyControlComponent
          ],
          multi: true
        } as Provider
      ]
    });
    fixture = TestBed.createComponent(DummyRenderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FormRenderService);
    controlRegistry = TestBed.inject(ControlRegistry);
    controlFactory = TestBed.inject(ControlFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should render single control', () => {
    const question: Question = {id: 'test', type: 'dummy'};
    service.render(
        component.componentViewContainerRef,
        new FastFormControl(question),
        question,
        controlRegistry.getDefinition('dummy'),
        {
          injector: Injector.create({providers: []})
        }
    );
    const element = fixture.debugElement.query(By.css('[data-test-id="dummy-test"]')).nativeElement as HTMLParagraphElement;
    expect(element).toBeDefined();
    expect(element.textContent).toEqual('Hallo');
  });
});

@Component({
  template: `
    <ng-container #componentViewContainer></ng-container>
  `
})
class DummyRenderComponent {

  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;
}
