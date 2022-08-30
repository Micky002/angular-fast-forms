import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FastFormControlComponent, Question } from '@ngx-fast-forms/core';
import { UiRegistryService } from '../../service/ui-registry.service';
import { FastFormControl } from '../../control/fast-form-control';

@Component({
  selector: 'aff-form-control',
  templateUrl: './fast-form-control.component.html'
})
export class FastFormControlComponentAsdf extends FastFormControlComponent implements OnInit {

  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Input() control1!: FastFormControl

  constructor(private uiRegistry: UiRegistryService) {
    super();
  }

  ngOnInit(): void {
    this.createComponent(this.control1.question);
  }

  private createComponent(question: Question) {
    console.log('aff-form-control: ', question);
    const formDefinition = this.uiRegistry.find(question.type);
    if (formDefinition) {
      this.uiRegistry.render(
        this.componentViewContainerRef,
        this.control1,
        question,
        formDefinition
      );
    }
  }
}
