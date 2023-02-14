import {
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
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
import { FormRenderService } from '../../internal/form-render.service';
import { HttpClient } from '@angular/common/http';
import { ActionService } from '../../actions/action.service';
import { ActionEvent } from '../../actions/models';
import { Subscription } from 'rxjs';
import { ArrayIndexDirective } from '../../actions/array-index.directive';
import { Control } from '../../control/control.decorator';
import { ControlRegistry } from '../../internal/control/control-registry.service';
import { FORM_CONTROL } from '../util/inject-token';
import { FormGroup } from '@angular/forms';

@Control({
  type: 'group',
  controlType: 'group'
})
@Component({
  selector: 'aff-form-group',
  templateUrl: './fast-form-group.component.html'
})
export class FastFormGroupComponent implements OnChanges, OnInit, OnDestroy {

  @Input() public endpoint!: string;
  @ViewChild('componentViewContainer', {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;
  @Output() public action = new EventEmitter<ActionEvent>();
  @Output() public submitEvent = new EventEmitter<FastFormSubmitEvent>();

  private _actionService: ActionService;
  private _actionsSub!: Subscription;

  constructor(private controlFactory: ControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              private formRenderService: FormRenderService,
              private injector: Injector,
              private controlRegistry: ControlRegistry,
              @Optional() actionService: ActionService,
              @Optional() private indexDirective?: ArrayIndexDirective,
              @Optional() private http?: HttpClient,
              @Inject(FORM_CONTROL) @Optional() private group?: FormGroup) {
    // console.log(group);
    this._formGroup = new FastFormGroup([], this.controlFactory);
    if (actionService) {
      this._actionService = actionService;
    } else {
      this._actionService = new ActionService();
    }
  }

  public _formGroup: FastFormGroup;

  @Input()
  public set formGroup(formGroup: FastFormGroup) {
    this._formGroup = formGroup;
  }

  ngOnInit(): void {
    Object.keys(this.group?.controls ?? {}).forEach(key => {
      this.formRenderService.renderOnly(this.componentViewContainerRef, this.group?.controls[key]!, {injector: this.injector});
    });

    this._formGroup.questionChanges.subscribe(() => {
      this.render();
    });
    this._actionsSub = this._actionService.actions.subscribe({
      next: event => {
        this.action.emit(event);
      }
    });
  }

  ngOnChanges(): void {
    this.render();
  }

  ngOnDestroy(): void {
    this._actionsSub.unsubscribe();
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
    if (this.controlRegistry.hasItem(question.type)) {
      const controlDefinition = this.controlRegistry.getDefinition(question.type);
      this.formRenderService.render(
          this.componentViewContainerRef,
          this._formGroup,
          question,
          controlDefinition,
          this.injector,
          this._actionService,
          this.indexDirective
      );
    }
  }
}
