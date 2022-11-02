import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeArrayComponent } from './time-array/time-array.component';
import { RouterModule } from '@angular/router';
import { CustomArrayExampleComponent } from './custom-array-example/custom-array-example.component';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionButtonsComponent } from './time-array/action-buttons/action-buttons.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { CustomArrayState } from './custom-array.state';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { DateRangeInputModule } from '../custom-nested-control/date-range-input/date-range-input.module';

@NgModule({
  declarations: [TimeArrayComponent, CustomArrayExampleComponent, ActionButtonsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomArrayExampleComponent
      }
    ]),
    FastFormsModule.forChild({
      controls: [
        TimeArrayComponent,
        ActionButtonsComponent
      ]
    }),
    MaterialFastFormsModule,
    MatIconModule,
    MatButtonModule,
    NgxsModule.forFeature([CustomArrayState]),
    NgxsFormPluginModule,
    DateRangeInputModule
  ]
})
export class CustomArrayModule {
}
