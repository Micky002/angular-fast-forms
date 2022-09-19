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

  /**
   * @deprecated Will be removed in 2.0.0
   */
  @Input() public set form(formGroup: FastFormGroup) {
    console.warn('The @Input() [form] of <aff-form-group> is deprecated and will be removed in version 2.0.0');
    this._formGroup = formGroup;
  }

  @Input() public set formGroup(formGroup: FastFormGroup) {
    this._formGroup = formGroup;
  }

  @Input() public endpoint!: string;
  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Output() submitEvent = new EventEmitter<FastFormSubmitEvent>();

  public _formGroup: FastFormGroup;

  constructor(private controlFactory: ControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              private uiRegistry: UiRegistryService,
              @Optional() private http?: HttpClient) {
    this._formGroup = new FastFormGroup([], this.controlFactory);
  }

  ngOnInit(): void {
    this._formGroup.questionChanges.subscribe(() => {
      this.render();
    });
  }

  ngOnChanges(): void {
    this.render();
  }

  processOnSubmit(event: unknown) {
    this._formGroup.markAllAsTouched();
    if (this._formGroup.valid) {
      this.submitEvent.next({
        event: event,
        data: this._formGroup.value
      });
    }
  }

  private render() {
    this.componentViewContainerRef.clear();
    this._formGroup.questions.filter(question => !question.hidden)
      .forEach(question => {
        this.createComponent(question);
      });
  }

  private createComponent(question: Question) {
    const formDefinition = this.uiRegistry.find(question.type);
    if (formDefinition) {
      this.uiRegistry.render(
        this.componentViewContainerRef,
        this._formGroup,
        question,
        formDefinition
      );
    }
  }
}
