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
    console.log('testing');
    this.form = fastFormService.createDynamicForm([{
      id: 'test-input',
      type: 'input'
    }])
  }
}
