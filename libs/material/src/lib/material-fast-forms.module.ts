import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectComponent } from './ui/select/select.component';
import { InputComponent } from './ui/input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AFF_CONTROL_COMPONENTS, FastFormsModule } from '@ngx-fast-forms/core';
import { ButtonComponent } from './action/button/button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FastFormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  declarations: [
    SelectComponent,
    InputComponent,
    ButtonComponent
  ],
  providers: [
    {
      provide: AFF_CONTROL_COMPONENTS,
      multi: true,
      useValue: [
        SelectComponent,
        InputComponent,
        ButtonComponent
      ]
    }
  ],
  exports: [
    FastFormsModule
  ]
})
export class MaterialFastFormsModule {
}
