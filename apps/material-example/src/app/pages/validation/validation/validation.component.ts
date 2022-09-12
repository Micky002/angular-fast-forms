import { Component } from '@angular/core';
import { AsyncRequiredValidatorService } from '../validators/async-required-validator.service';

@Component({
  selector: 'frontend-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent {

  constructor(private vali: AsyncRequiredValidatorService) {
  }
}
