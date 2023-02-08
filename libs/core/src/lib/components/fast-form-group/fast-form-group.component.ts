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
import { Subscription } from 'rxjs';
import { ActionService } from '../../actions/action.service';
import { ArrayIndexDirective } from '../../actions/array-index.directive';
import { ActionEvent } from '../../actions/models';
import { Control } from '../../control/control.decorator';
import { FastFormGroup } from '../../control/fast-form-group';
import { FormRenderService } from '../../internal/base-form-renderer.service';
import { ControlRegistry } from '../../internal/control/control-registry.service';
import { FastFormSubmitEvent, Question } from '../../model';
import { ControlFactoryService } from '../../service/control-factory.service';
import { FastFormsService } from '../../service/fast-forms.service';
import { QuestionDefinition } from '../question-definition';
import { FORM_CONTROL } from '../util/inject-token';

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
  })
  viewContainer!: ViewContainerRef;
  @Output() public action = new EventEmitter<ActionEvent>();
  @Output() public submitEvent = new EventEmitter<FastFormSubmitEvent>();

  private _dynRendered = false;
  private _actionService: ActionService;
  private _actionsSub!: Subscription;

  constructor(
      private controlFactory: ControlFactoryService,
      private formRenderService: FormRenderService,
      private injector: Injector,
      private controlRegistry: ControlRegistry,
      @Optional() actionService: ActionService,
      @Optional() private indexDirective?: ArrayIndexDirective,
      @Optional() questionDefinition?: QuestionDefinition,
      @Optional() @Inject(FORM_CONTROL) formGroup?: FastFormGroup
  ) {
    if (formGroup) {
      this._formGroup = formGroup;
      this._dynRendered = true;
    } else {
      this._formGroup = new FastFormGroup(
          {
            id: FastFormsService.ROOT_GROUP_ID,
            type: 'group'
          },
          this.controlFactory
      );
    }
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
    this._formGroup.questionChanges.subscribe(() => {
      this.render();
    });
    this._actionsSub = this._actionService.actions.subscribe({
      next: (event) => {
        this.action.emit(event);
      }
    });
    if (this._dynRendered) {
      this.render();
    }
  }

  ngOnChanges(changes: any): void {
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
    this.viewContainer.clear();
    this._formGroup.questions
        .filter((question) => !question.hidden)
        .forEach((question) => {
          this.createComponent(question);
        });
  }

  private createComponent(question: Question) {
    if (this.controlRegistry.hasItem(question.type)) {
      this.formRenderService.render(
          this.viewContainer,
          this._formGroup,
          question,
          {
            injector: this.injector,
            actionService: this._actionService,
            indexDirective: this.indexDirective
          }
      );
    }
  }
}
