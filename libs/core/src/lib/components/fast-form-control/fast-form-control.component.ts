import { Component, Injector, Input, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { UiRegistryService } from '../../service/ui-registry.service';
import { FastFormControl } from '../../control/fast-form-control';
import { Question } from '../../model';
import { ActionService } from '../../actions/action.service';
import { ArrayIndexDirective } from '../../actions/array-index.directive';

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

  constructor(private uiRegistry: UiRegistryService,
              private injector: Injector,
              @Optional() private actionService?: ActionService,
              @Optional() private arrayIndex?: ArrayIndexDirective) {
  }

  ngOnInit(): void {
    this.createComponent(this.control.question);
  }

  private createComponent(question: Question) {
    const formDefinition = this.uiRegistry.findControl(question.type);
    if (formDefinition) {
      this.uiRegistry.render(
          this.componentViewContainerRef,
          this.control,
          question,
          formDefinition,
          this.injector,
          this.actionService
      );
    }
  }
}
