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
  }

  ngOnInit(): void {
    this.form.setValue({
      'test-array': [
        'asdf',
        'meins'
      ]
    });
  }

  setValue() {
    this.form.setValue({
      'test-array': [
        'asdfasdfasdf',
        'meinasdfasdfs',
        'asdfasdfs'
      ]
    });
  }

  patchValue() {
    this.form.patchValue({
      'test-array': [
        'first value',
        'second value',
        'third value',
        'fourth value'
      ]
    });
  }
}
