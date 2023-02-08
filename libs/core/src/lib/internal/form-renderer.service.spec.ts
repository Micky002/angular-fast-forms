import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Question } from '../model';
import { Component, Injector, Provider, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlRegistry } from './control/control-registry.service';
import { By } from '@angular/platform-browser';
import { Control } from '../control/control.decorator';
import { ControlFactoryService } from '../service/control-factory.service';
import { FastFormControl } from '../control/fast-form-control';
import { FormRenderService } from './base-form-renderer.service';
import { ViewContainerRefMock } from '../test/mock/view-container-ref.mock';
import { FormRenderServiceImpl } from './form-renderer.service';
import { AFF_CONTROL_COMPONENTS, CONTROL_ID, FORM_CONTROL } from '../components/util/inject-token';
import { QuestionDefinition } from '../components/question-definition';

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
  // let controlFactory: ControlFactoryService;
  // let controlRegistry: ControlRegistry;
  let fixture: ComponentFixture<DummyRenderComponent>;
  let component: DummyRenderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyRenderComponent
      ],
      providers: [
        {
          provide: FormRenderService,
          useClass: FormRenderServiceImpl
        },
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
    // controlRegistry = TestBed.inject(ControlRegistry);
    // controlFactory = TestBed.inject(ControlFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should render single control', () => {
    const question: Question = {id: 'test', type: 'dummy'};
    service.renderControl(
        component.componentViewContainerRef,
        new FastFormControl(null, {question}),
        {
          injector: Injector.create({providers: []})
        }
    );
    const element = fixture.debugElement.query(By.css('[data-test-id="dummy-test"]')).nativeElement as HTMLParagraphElement;
    expect(element).toBeDefined();
    expect(element.textContent).toEqual('Hallo');
  });

  it('should inject only the single control dependencies', () => {
    const viewContainer = new ViewContainerRefMock();
    const control = new FastFormControl(null, {
      question: {
        type: 'dummy'
      }
    });
    const component = service.renderControl(viewContainer, control);
    expect(component.injector.get(FORM_CONTROL)).toEqual(control);
    expect(component.injector.get(QuestionDefinition)).toEqual(new QuestionDefinition({type: 'dummy'}));
    expect(component.injector.get(CONTROL_ID, null)).toBeNull();
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
