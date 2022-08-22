import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DynamicFormGroup } from "../dynamic-form-group";
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from "../model";
import { FormControlFactoryService } from '../control/form-control-factory.service';
import { ValidatorFactoryService } from "../validation/validator-factory.service";

@Component({
  selector: 'code-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {

  @Input() public form: DynamicFormGroup;
  @ViewChild("componentViewContainer", {
    read: ViewContainerRef,
    static: true
  }) componentViewContainerRef!: ViewContainerRef;

  @Output() codeOnSubmit = new EventEmitter();

  constructor(private controlFactory: FormControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              @Optional() @Inject(DYNAMIC_FORM_CONTROL) private controlDefinitions?: Array<DynamicFormDefinition>) {
    this.form = new DynamicFormGroup([], this.controlFactory, this.validatorFactory);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.componentViewContainerRef.clear();
    this.form.questions.filter(question => !question.hidden)
      .forEach(question => {
        const dynamicFormDefinition = (this.controlDefinitions || []).find(c => c.type === question.type);
        if (dynamicFormDefinition) {
          const dynamicFormControlRef = this.componentViewContainerRef.createComponent(dynamicFormDefinition.component);
          const component = dynamicFormControlRef.instance;
          component.formGroup = this.form
          component.question = question;
          component.control = this.form.controls[question.id];
        }
      });
  }

  processOnSubmit(event: any) {
    this.form.markAllAsTouched();
    this.codeOnSubmit.next(event);
  }
}
