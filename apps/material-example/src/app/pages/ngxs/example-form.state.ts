import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';

@State({
  name: 'example',
  defaults: {
    exampleForm: {
      model: {
        first: 'meins'
      },
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
@Injectable()
export class ExampleFormState {

  @Action(UpdateFormValue)
  private updateFormValue(ctx: StateContext<any>, action: UpdateFormValue) {
    let currentState = ctx.getState();
    ctx.patchState({
      ...currentState,
      exampleForm: {
        ...currentState.exampleForm,
        model: {
          ...action.payload.value
        }
      }
    })
  }
}
