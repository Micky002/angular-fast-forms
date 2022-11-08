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
import { FormControl, FormGroup } from '@angular/forms';
import { ActionService } from '../../actions/action.service';
import { Control } from '../../control/control.decorator';
import { FormRenderService } from '../../internal/form-render.service';
import { Question } from '../../model';
import { CONTROL_CHILDREN, CONTROL_PROPERTIES } from '../util/inject-token';
import { FastFormRowProperties } from './fast-form-row.properties';



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

  constructor(private uiRegistry: FormRenderService,
              private renderer: Renderer2,
              private injector: Injector,
              @Inject(CONTROL_CHILDREN) public questions: Question[],
              @Inject(FormControl) public formGroup: FormGroup,
              @Inject(CONTROL_PROPERTIES) private properties: FastFormRowProperties,
              @Optional() private actionService?: ActionService) {
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
