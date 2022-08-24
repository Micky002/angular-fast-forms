import { Component, Inject } from '@angular/core';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-lazy-loading-example',
  templateUrl: './lazy-loading-example.component.html',
  styleUrls: ['./lazy-loading-example.component.scss'],
})
export class LazyLoadingExampleComponent {

  form: FastFormGroup;

  constructor(private fastFormService: FastFormsService,
              @Inject(DYNAMIC_FORM_CONTROL) private asdf: Array<DynamicFormDefinition>) {
    this.form = this.fastFormService.createDynamicForm([{
      id: 'Example',
      type: 'lazy-input'
    }]);
  }
}
