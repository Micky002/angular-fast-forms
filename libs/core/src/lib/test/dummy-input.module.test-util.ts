import { NgModule } from '@angular/core';
import { DummyInputComponent } from './dummy-input.test-util';
import { ReactiveFormsModule } from '@angular/forms';
import { FastFormsModule } from '@ngx-fast-forms/core';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FastFormsModule.forChild({
      controls: [
        DummyInputComponent
      ]
    })
  ],
  declarations: [
    DummyInputComponent
  ]
})
export class DummyInputModule {

}
