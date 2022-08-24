import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FastFormGroup } from '../../control/fast-form-group';
import { Question } from '../../model';
import { FormControlFactoryService } from '../../service/form-control-factory.service';
import { ValidatorFactoryService } from '../../validation/validator-factory.service';
import { UiRegistryService } from '../../service/ui-registry.service';
import { FastFormControl } from '../../control/abstract-control';
import { FastFormInline } from '../../control/abstract-inline';

@Component({
  selector: 'aff-form-group',
  templateUrl: './fast-form-group.component.html'
})
export class FastFormGroupComponent implements OnChanges {

  @Input() public form: FastFormGroup;
  @ViewChild("componentViewContainer", {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Output() codeOnSubmit = new EventEmitter();

  constructor(private controlFactory: FormControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              private uiRegistry: UiRegistryService) {
    this.form = new FastFormGroup([], this.controlFactory, this.validatorFactory, this.uiRegistry);
  }

  ngOnChanges(): void {
    this.componentViewContainerRef.clear();
    this.form.questions.filter(question => !question.hidden)
      .forEach(question => {
        this.createComponent(question);
      });
  }

  processOnSubmit(event: unknown) {
    this.form.markAllAsTouched();
    this.codeOnSubmit.next(event);
  }

  private createComponent(question: Question) {
    const dynamicFormDefinition = this.uiRegistry.find(question.type);
    if (dynamicFormDefinition) {
      const dynamicFormControlRef = this.componentViewContainerRef.createComponent(dynamicFormDefinition.component);
      if (dynamicFormDefinition.inline) {
        const component = dynamicFormControlRef.instance as FastFormInline;
        component.formGroup = this.form
        component.questions = question.children || [];
      } else {
        const component = dynamicFormControlRef.instance as FastFormControl;
        component.formGroup = this.form
        component.question = question;
        component.control = this.form.controls[question.id];
      }
    }
  }
}
