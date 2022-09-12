import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorComponent } from './custom-validator/custom-validator.component';
import { RouterModule } from '@angular/router';
import { ValidationComponent } from './validation/validation.component';
import { MatButtonModule } from '@angular/material/button';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { AsyncRequiredValidatorService } from './validators/async-required-validator.service';
import { CustomStartWithService } from './validators/custom-start-with.service';
import { CustomRequiredService } from './validators/custom-required.service';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { AsyncStartWithService } from './validators/async-start-with.service';

@NgModule({
  declarations: [
    CustomValidatorComponent,
    ValidationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ValidationComponent,
        children: [{
          path: 'custom-validator',
          component: CustomValidatorComponent
        }]
      }
    ]),
    MatButtonModule,
    FastFormsModule.forChild({
      validators: [
        AsyncRequiredValidatorService,
        CustomStartWithService,
        CustomRequiredService,
        AsyncStartWithService
      ]
    }),
    MaterialFastFormsModule
  ]
})
export class ValidationModule {
}
