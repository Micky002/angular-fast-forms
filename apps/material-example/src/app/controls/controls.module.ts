import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlCompositionComponent } from '../pages/control-composition/control-composition.component';
import { ControlsComponent } from './controls.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ControlsComponent,
      children: [{
        path: 'composition',
        component: ControlCompositionComponent
      }]
    }])
  ]
})
export class ControlsModule {
}
