import { FormArray, FormControl } from '@angular/forms';
import { Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';
import { Subject } from 'rxjs';

export class FastFormControl extends FormControl {

  constructor(public question: Question) {
    super([]);
  }
}
