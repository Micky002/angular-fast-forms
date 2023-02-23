import { NgModule } from '@angular/core';
import { AFF_CONTROL_COMPONENTS } from '@ngx-fast-forms/core';
import { SwitchableInputComponent } from './switchable-input.component';

@NgModule({
  providers: [{
    provide: AFF_CONTROL_COMPONENTS,
    useValue: [SwitchableInputComponent],
    multi: true
  }]
})
export class SwitchableInputModule {
}
