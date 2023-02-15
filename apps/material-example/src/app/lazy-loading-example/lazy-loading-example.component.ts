import { Component } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'matex-lazy-loading-example',
  templateUrl: './lazy-loading-example.component.html',
  styleUrls: ['./lazy-loading-example.component.scss']
})
export class LazyLoadingExampleComponent {

  form: FastFormGroup;

  constructor(private fastFormService: FastFormsService) {
    this.form = this.fastFormService.createDynamicForm([{
      id: 'Example',
      type: 'lazy-input'
    }]);
  }
}
