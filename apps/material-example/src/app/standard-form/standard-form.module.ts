import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SimpleExampleComponent } from './simple-example/simple-example.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'simple-example',
        component: SimpleExampleComponent
      }
    ])
  ]
})
export class StandardFormModule {
}
