import { AbstractControl } from '@angular/forms';
import { StaticProvider } from '@angular/core';
import { CONTROL_PROPERTIES } from '../components/util/inject-token';
import { QuestionDefinition } from '../components/question-definition';
import { FastFormArray } from '../control/fast-form-array';
import { FastFormControl } from '../control/fast-form-control';
import { FastFormGroup } from '../control/fast-form-group';
import { Question } from '../model';

export function createDefaultProviders(control: AbstractControl, question?: Question): StaticProvider[] {
  const providers: StaticProvider[] = [];
  if (control instanceof FastFormGroup ||
      control instanceof FastFormControl ||
      control instanceof FastFormArray) {
    if (control.question) {
      providers.push({
        provide: QuestionDefinition,
        useValue: new QuestionDefinition(question ? question : control.question)
      });
    }
    providers.push({
      provide: CONTROL_PROPERTIES,
      useValue: question ? question.properties ?? {} : control.question?.properties ?? {}
    });
  }
  return providers;
}
