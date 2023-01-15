import {
  Component,
  EventEmitter,
  Inject,
  Injector,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Question } from '../../model';
import { FormRenderService } from '../../internal/form-render.service';
import { CONTROL_PROPERTIES, FORM_CONTROL } from '../util/inject-token';
import { FastFormsRowProperties } from './models';
import { ActionService } from '../../actions/action.service';
import { Control } from '../../control';
import { QuestionDefinition } from '../question-definition';
import { AbstractControl } from '@angular/forms';
import { ControlRegistry } from '../../internal/control/control-registry.service';

@Control({
  type: 'row',
  inline: true
})
@Component({
  selector: 'aff-form-row',
  templateUrl: './fast-form-row.component.html'
})
export class FastFormRowComponent implements OnInit, OnChanges {

  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Output() codeOnSubmit = new EventEmitter();

  constructor(private formRenderService: FormRenderService,
              private renderer: Renderer2,
              private injector: Injector,
              private definition: QuestionDefinition,
              private controlRegistry: ControlRegistry,
              @Inject(FORM_CONTROL) private control: AbstractControl,
              @Inject(CONTROL_PROPERTIES) private properties: FastFormsRowProperties,
              @Optional() private actionService: ActionService) {
  }

  private get children(): Question[] {
    return this.definition.children ?? [];
  }

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  private render() {
    this.componentViewContainerRef.clear();
    this.children.filter(question => !question.hidden)
        .forEach(question => {
          this.createComponent(question);
        });
  }

  private createComponent(question: Question) {
    if (this.controlRegistry.hasItem(question.type)) {
      const formDefinition = this.controlRegistry.getDefinition(question.type);
      const componentRef = this.formRenderService.render(
          this.componentViewContainerRef,
          this.control,
          question,
          formDefinition,
          this.injector,
          this.actionService
      );
      const nativeElement = componentRef.location.nativeElement as HTMLElement;
      if (this.properties.size) {
        nativeElement.style.flexBasis = `${this.properties.size[question.id]?.percent}%`;
      }
      this.renderer.addClass(componentRef.location.nativeElement, `row_${question.id}`);
    }
  }
}
