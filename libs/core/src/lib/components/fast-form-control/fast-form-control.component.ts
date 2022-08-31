import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Question } from '@ngx-fast-forms/core';
import { UiRegistryService } from '../../service/ui-registry.service';
import { FastFormControl } from '../../control/fast-form-control';

@Component({
  selector: 'aff-form-control',
  templateUrl: './fast-form-control.component.html'
})
export class FastFormControlComponent implements OnInit {

  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Input() control!: FastFormControl

  constructor(private uiRegistry: UiRegistryService) {}

  ngOnInit(): void {
    this.createComponent(this.control.question);
  }

  private createComponent(question: Question) {
    // console.log('aff-form-control: ', question);
    const formDefinition = this.uiRegistry.find(question.type);
    if (formDefinition) {
      this.uiRegistry.render(
        this.componentViewContainerRef,
        this.control,
        question,
        formDefinition
      );
    }
  }
}
