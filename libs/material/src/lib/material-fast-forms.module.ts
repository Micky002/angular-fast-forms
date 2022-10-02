import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectComponent } from './ui/select/select.component';
import { InputComponent } from './ui/input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AFF_CONTROL_COMPONENTS } from '@ngx-fast-forms/core';
import { FastFormsNgxTranslateModule } from "@ngx-fast-forms/ngx-translate-plugin";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    FastFormsNgxTranslateModule
  ],
  declarations: [
    SelectComponent,
    InputComponent
  ],
  providers: [
    {
      provide: AFF_CONTROL_COMPONENTS,
      multi: true,
      useValue: [SelectComponent, InputComponent]
    }
  ]
})
export class MaterialFastFormsModule {
}
