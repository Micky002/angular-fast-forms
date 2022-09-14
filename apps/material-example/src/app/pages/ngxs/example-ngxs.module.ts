import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsPluginExampleComponent } from './forms-plugin-example/forms-plugin-example.component';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ExampleFormState } from './example-form.state';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    FormsPluginExampleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: FormsPluginExampleComponent
    }]),
    NgxsModule.forFeature([
      ExampleFormState
    ]),
    NgxsFormPluginModule.forRoot(),
    FastFormsModule.forChild(),
    MaterialFastFormsModule,
    ReactiveFormsModule
  ]
})
export class ExampleNgxsModule {}
