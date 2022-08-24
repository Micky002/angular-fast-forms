import { Component, EventEmitter, OnChanges, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FastFormControl } from '../../control/abstract-control';
import { FastFormInline } from '../../control/abstract-inline';
import { Question } from '../../model';
import { UiRegistryService } from '../../service/ui-registry.service';

@Component({
  selector: 'aff-form-row',
  templateUrl: './fast-form-row.component.html'
})
export class FastFormRowComponent extends FastFormInline implements OnInit, OnChanges {

  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Output() codeOnSubmit = new EventEmitter();

  constructor(private uiRegistry: UiRegistryService) {
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
    const dynamicFormDefinition = this.uiRegistry.find(question.type);
    if (dynamicFormDefinition) {
      const dynamicFormControlRef = this.componentViewContainerRef.createComponent(dynamicFormDefinition.component);
      const component = dynamicFormControlRef.instance as FastFormControl;
      component.formGroup = this.formGroup;
      component.question = question;
      component.control = this.formGroup.controls[question.id];
    }
  }
}
