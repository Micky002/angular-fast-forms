import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlComponent } from './control.component';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { SwitchableControlComponent } from './nested-control/switchable-control/switchable-control.component';
import { NestedControlComponent } from './nested-control/nested-control.component';

@NgModule({
  declarations: [
    // NestedControlComponent
  ],
  imports: [
    CommonModule,
    FastFormsModule.forChild({
      controls: [SwitchableControlComponent]
    }),
    RouterModule.forChild([
      {
        path: '',
        component: ControlComponent,
        children: [
          {
            path: 'nested-control',

            // loadComponent: () => import('./nested-control/nested-control.component').then(m => m.NestedControlComponent),
            component: NestedControlComponent
            // providers: [importProvidersFrom(FastFormsModule.forChild({
            //   controls: [
            //     SwitchableControlComponent
            //   ]
            // }))]
          }
        ]
      }
    ])
    // NestedControlComponent
  ]
})
export class ControlModule {
}
