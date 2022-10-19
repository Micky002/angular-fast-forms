import { Component, Input, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { UiRegistryService } from '../../service/ui-registry.service';
import { FastFormControl } from '../../control/fast-form-control';
import { Question } from '../../model';
import { ActionService } from '../../actions/action.service';

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
              @Optional() private actionService?: ActionService) {
  }

  ngOnInit(): void {
    this.createComponent(this.control.question);
  }

  private createComponent(question: Question) {
    const formDefinition = this.uiRegistry.find(question.type);
    if (formDefinition) {
      this.uiRegistry.render(
          this.componentViewContainerRef,
          this.control,
          question,
          formDefinition,
          null as any,
          this.actionService
      );
    }
  }
}
