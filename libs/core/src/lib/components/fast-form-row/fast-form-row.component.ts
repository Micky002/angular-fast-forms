import {
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { BaseFormInlineComponent } from '../base/base-inline.component';
import { Question } from '../../model';
import { UiRegistryService } from '../../service/ui-registry.service';
import { CONTROL_PROPERTIES } from '../util/inject-token';
import { FastFormsRowProperties } from './models';
import { ActionService } from '../../actions/action.service';

@Component({
  selector: 'aff-form-row',
  templateUrl: './fast-form-row.component.html'
})
export class FastFormRowComponent extends BaseFormInlineComponent implements OnInit, OnChanges {

  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Output() codeOnSubmit = new EventEmitter();

  constructor(private uiRegistry: UiRegistryService,
              private renderer: Renderer2,
              @Inject(CONTROL_PROPERTIES) private properties: FastFormsRowProperties,
              @Optional() private actionService: ActionService) {
    super();
  }

  ngOnInit(): void {
    this.componentViewContainerRef.clear();
    this.questions?.filter(question => !question.hidden)
        .forEach(question => {
          this.createComponent(question);
        });
  }

  ngOnChanges(): void {
    this.componentViewContainerRef.clear();
    this.questions.filter(question => !question.hidden)
        .forEach(question => {
          this.createComponent(question);
        });
  }

  private createComponent(question: Question) {
    const formDefinition = this.uiRegistry.find(question.type);
    if (formDefinition) {
      const componentRef = this.uiRegistry.render(
          this.componentViewContainerRef,
          this.formGroup,
          question,
          formDefinition,
          null as any,
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
