import { Component, OnInit } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';

@Component({
  selector: 'frontend-custom-nested-control',
  templateUrl: './custom-nested-control.component.html',
  styleUrls: ['./custom-nested-control.component.scss'],
})
export class CustomNestedControlComponent implements OnInit {

  form!: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.form = formService.createDynamicForm([{
      id: 'date_range',
      type: 'date-range'
    }]);
  }

  ngOnInit(): void {
    this.form.setValue({
      date_range: {
        from: new Date(),
        until: new Date()
      }
    });
  }
}
