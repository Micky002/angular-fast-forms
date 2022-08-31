import { Component } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-github-readme-example',
  templateUrl: './github-readme-example.component.html',
  styleUrls: ['./github-readme-example.component.scss'],
})
export class GithubReadmeExampleComponent {

  public form!: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.form = formService.createDynamicForm([{
      id: 'first-input',
      type: 'input', // depends on used ui component library or use the one registered by yourself
      label: 'Example input'
    }, {
      id: 'second-input',
      type: 'input',
      label: 'Second input'
    }]);
  }
}
