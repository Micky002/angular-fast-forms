import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Control, FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';
import { FormControl } from '@angular/forms';
import { SelectOption, SelectProperties } from './select.models';

@Control({
  type: 'select,mat-select'
})
@Component({
  selector: 'aff-material-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

  public selectOptions: Array<SelectOption> = [];

  private properties?: SelectProperties;

  constructor(@Inject(FORM_CONTROL) public control: FormControl,
              public question: QuestionDefinition,
              private http: HttpClient) {
    this.properties = question.properties as SelectProperties;
  }

  ngOnInit(): void {
    this.refreshSelectOptions();
  }

  private refreshSelectOptions() {
    if (this.properties?.optionsEndpoint) {
      this.http.get<Array<SelectOption>>(this.properties.optionsEndpoint, {
        observe: 'response'
      }).pipe(
          map(response => {
            return response.body || [];
          }),
          catchError(() => {
            return of([] as Array<SelectOption>);
          })
      ).subscribe(options => {
        const constantOptions: Array<SelectOption> = this.properties?.options ?? [];
        this.selectOptions = this.addEmptyOption(constantOptions.concat(options));
      });
    } else {
      this.selectOptions = this.addEmptyOption(this.properties?.options ?? []);
    }
  }

  private addEmptyOption(options: Array<SelectOption>): Array<SelectOption> {
    if (this.properties?.emptyOptionName) {
      return [{value: this.properties.emptyOptionValue || '', name: this.properties.emptyOptionName}, ...options];
    } else {
      return options;
    }
  }
}
