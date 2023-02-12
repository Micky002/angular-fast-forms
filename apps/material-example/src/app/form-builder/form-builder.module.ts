import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilderComponent } from './form-builder.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormBuilderComponent,
        children: [
          {
            path: 'group',
            component: GroupComponent
          }
        ]
      }
    ])
  ]
})
export class FormBuilderModule {
}
