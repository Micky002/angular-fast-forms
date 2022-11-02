import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State({
  name: 'customArray',
  defaults: {
    exampleForm: {
      model: {
        first: 'initial value'
      },
      dirty: false,
      status: 'VALID',
      errors: {}
    }
  }
})
@Injectable()
export class CustomArrayState {
}
