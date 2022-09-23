import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State({
  name: 'example',
  defaults: {
    exampleForm: {
      model: {
        first: 'initial value'
      },
      dirty: false,
      status: 'INVALID',
      errors: {}
    }
  }
})
@Injectable()
export class ExampleFormState {
}
