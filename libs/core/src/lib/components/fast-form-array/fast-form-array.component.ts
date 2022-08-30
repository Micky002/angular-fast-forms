import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FastFormArrayAsdf } from '../../control/abstract-array';
import { UiRegistryService } from '../../service/ui-registry.service';
import { Question } from '@ngx-fast-forms/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'aff-form-array',
  templateUrl: './fast-form-array.component.html',
  styles: [],
})
export class FastFormArrayComponent extends FastFormArrayAsdf implements OnInit {

  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Output() codeOnSubmit = new EventEmitter();

  constructor(private uiRegistry: UiRegistryService) {
    super();
  }

  ngOnInit(): void {
    console.log('form-array-component init');
    this.componentViewContainerRef.clear();
    this.formGroup.valueChanges.subscribe(value => {

    });
    console.log(this.formArray);
    this.formArray.renderChanged.subscribe(render => {
      console.log('render');
    });
    this.formArray.register(() => {
      console.log('render registered');
    })

    console.log('len: ', this.formArray.length);

    for (let i = 0; i < this.formArray.length; i++) {
      // this.createComponent(this.question);
    }
  }

  ngOnChanges(): void {
    this.componentViewContainerRef.clear();
    // this.questions.filter(question => !question.hidden)
    //   .forEach(question => {
    //     this.createComponent(question);
    //   });
  }

  public isControl(data: any): boolean {
    return data instanceof FormControl;
  }

  public isGroup(data: any): boolean {
    return data instanceof FormGroup;
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
