import { Component, OnInit } from '@angular/core';
import { SelectOption } from './select-option.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { SelectProperties } from './select.properties';
import { FastFormControl } from '@ngx-fast-forms/core';

@Component({
  selector: 'aff-material-select',
  templateUrl: './select.component.html'
})
export class SelectComponent extends FastFormControl implements OnInit {

  public selectOptions: Array<SelectOption> = [];

  constructor(private http: HttpClient) {
    super();
  }

  private get properties(): SelectProperties {
    return this.baseProperties as SelectProperties;
  }

  ngOnInit(): void {
    this.refreshSelectOptions();
  }

  private refreshSelectOptions() {
    if (this.properties.optionsEndpoint) {
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
        const constantOptions: Array<SelectOption> = this.properties.options || [];
        this.selectOptions = this.addEmptyOption(constantOptions.concat(options));
      });
    } else {
      this.selectOptions = this.addEmptyOption(this.properties.options || []);
    }
  }

  private addEmptyOption(options: Array<SelectOption>): Array<SelectOption> {
    if (this.properties.emptyOptionName) {
      return [{value: this.properties.emptyOptionValue || '', name: this.properties.emptyOptionName}, ...options];
    } else {
      return options;
    }
  }
}
