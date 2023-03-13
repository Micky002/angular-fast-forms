import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LegacyFactoryComponent } from './legacy-factory.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LegacyFactoryComponent
      }
    ])
  ]
})
export class LegacyFactoryModule {
}
