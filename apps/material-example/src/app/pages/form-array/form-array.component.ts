import { Component, OnInit } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {

  form: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.form = this.formService.createDynamicForm([{
      id: 'test-array',
      type: 'array',
      children: [{
        id: 'first-input',
        type: 'input'
      }]
    }]);

    // {
    //   id: 'test-group',
    //     type: 'group',
    //   children: [{
    //   id: 'first-input',
    //   type: 'input'
    // }]
    // }
  }

  ngOnInit(): void {
    this.form.setValue({
      'test-array': ['asdf', 'meins'
      ]
    });
  }

  testing() {
    this.form.setValue({
      'test-array': ['asdf', 'meins'
      ]
    });
  }
}
