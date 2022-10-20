import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeArrayComponent } from './time-array/time-array.component';
import { RouterModule } from '@angular/router';
import { CustomArrayExampleComponent } from './custom-array-example/custom-array-example.component';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionButtonsComponent } from './time-array/action-buttons/action-buttons.component';

@NgModule({
  declarations: [TimeArrayComponent, CustomArrayExampleComponent, ActionButtonsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomArrayExampleComponent,
      },
    ]),
    FastFormsModule.forChild({
      controls: [TimeArrayComponent],
    }),
    MaterialFastFormsModule,
  ],
})
export class CustomArrayModule {}
