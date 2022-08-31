import { Component, EventEmitter, OnChanges, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseFormInlineComponent } from '../base/base-inline.component';
import { Question } from '../../model';
import { UiRegistryService } from '../../service/ui-registry.service';

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
    const formDefinition = this.uiRegistry.find(question.type);
    if (formDefinition) {
      this.uiRegistry.render(
        this.componentViewContainerRef,
        this.formGroup,
        question,
        formDefinition
      );
    }
  }
}
