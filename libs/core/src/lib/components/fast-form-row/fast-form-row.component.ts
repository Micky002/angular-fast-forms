import { Component, EventEmitter, OnChanges, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FastFormInline } from '../../control/abstract-inline';
import { FastFormControl, Question } from '@ngx-fast-forms/core';
import { UiRegistryService } from '../../service/ui-registry.service';

@Component({
  selector: 'angular-fast-forms-form-row',
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
    console.log(this.questions);
    this.questions?.filter(question => !question.hidden)
      .forEach(question => {
        if (question.type === 'row' && question.children) {
          // question.children.forEach(c => this.createComponent(c));
          this.createComponent(question);
        } else {
          this.createComponent(question);
        }
      });

  }

  ngOnChanges(): void {
    this.componentViewContainerRef.clear();
    console.log(this.questions);
    this.questions.filter(question => !question.hidden)
      .forEach(question => {
        if (question.type === 'row' && question.children) {
          // question.children.forEach(c => this.createComponent(c));
          this.createComponent(question);
        } else {
          this.createComponent(question);
        }
      });
  }


  processOnSubmit(event: any) {
    // this.form.markAllAsTouched();
    this.codeOnSubmit.next(event);
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
