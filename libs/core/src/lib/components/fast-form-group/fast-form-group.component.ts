import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FastFormGroup } from '../../control/fast-form-group';
import { FastFormSubmitEvent, Question } from '../../model';
import { ControlFactoryService } from '../../service/control-factory.service';
import { ValidatorFactoryService } from '../../validation/validator-factory.service';
import { UiRegistryService } from '../../service/ui-registry.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'aff-form-group',
  templateUrl: './fast-form-group.component.html'
})
export class FastFormGroupComponent implements OnChanges, OnInit {

  @Input() public form: FastFormGroup;
  @Input() public endpoint!: string;
  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Output() submitEvent = new EventEmitter<FastFormSubmitEvent>();

  constructor(private controlFactory: ControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              private uiRegistry: UiRegistryService,
              @Optional() private http?: HttpClient) {
    this.form = new FastFormGroup([], this.controlFactory);
  }

  ngOnInit(): void {
    this.form.questionChanges.subscribe(() => {
      this.render();
    });
  }

  ngOnChanges(): void {
    this.render();
  }

  processOnSubmit(event: unknown) {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitEvent.next({
        event: event,
        data: this.form.value
      });
    }
  }

  private render() {
    this.componentViewContainerRef.clear();
    this.form.questions.filter(question => !question.hidden)
      .forEach(question => {
        this.createComponent(question);
      });
  }

  private createComponent(question: Question) {
    const formDefinition = this.uiRegistry.find(question.type);
    if (formDefinition) {
      this.uiRegistry.render(
        this.componentViewContainerRef,
        this.form,
        question,
        formDefinition
      );
    }
  }
}
