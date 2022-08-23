import { Component } from '@angular/core';
import { FastFormsGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'material-example';

  public form!: FastFormsGroup;

  constructor(private fastFormService: FastFormsService) {
    this.form = fastFormService.createDynamicForm([{
      id: 'test-input',
      type: 'input'
    }, {
      id: 'test-another-input',
      type: 'input'
    }])
  }
}
