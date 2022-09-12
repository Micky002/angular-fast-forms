import { Injectable } from '@angular/core';
import { BaseAsyncValidator, Validator } from '@ngx-fast-forms/core';
import { AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Validator({
  id: 'async-start-with',
  type: 'async'
})
@Injectable()
export class AsyncStartWithService implements BaseAsyncValidator {

  constructor(private http: HttpClient) { }

  createValidator(args: string[]): AsyncValidatorFn {
    return control => {
      return this.http.get('assets/validation/async-start-with.json');
    }
  }
}
