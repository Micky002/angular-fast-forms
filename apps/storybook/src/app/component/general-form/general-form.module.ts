import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralFormComponent } from './general-form.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { FastFormsModule } from '@ngx-fast-forms/core';
import {AppModule} from "../../app.module";

@NgModule({
  declarations: [GeneralFormComponent],
  imports: [
    CommonModule,
    FastFormsModule,
    MaterialFastFormsModule,
    AppModule
  ],
})
export class GeneralFormModule {}
