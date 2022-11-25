import { Component, Injector, Input, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { FormRenderService } from '../../internal/form-render.service';
import { FastFormControl } from '../../control/fast-form-control';
import { Question } from '../../model';
import { ActionService } from '../../actions/action.service';
import { ArrayIndexDirective } from '../../actions/array-index.directive';
import { ControlRegistry } from '../../internal/control/control-registry.service';

@Component({
  selector: 'aff-form-control',
  templateUrl: './fast-form-control.component.html'
})
export class FastFormControlComponent implements OnInit {

  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Input() control!: FastFormControl;

  constructor(private renderService: FormRenderService,
              private uiRegistryV2: ControlRegistry,
              private injector: Injector,
              @Optional() private actionService?: ActionService,
              @Optional() private arrayIndex?: ArrayIndexDirective) {
  }

  ngOnInit(): void {
    this.createComponent(this.control.question);
  }

  private createComponent(question: Question) {
    if (this.uiRegistryV2.hasItem(question.type)) {
      this.renderService.render(this.componentViewContainerRef,
          this.control,
          question,
          this.uiRegistryV2.getDefinition(question.type),
          this.injector,
          this.actionService);
    }
  }
}
