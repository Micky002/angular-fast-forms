import { AbstractControl } from '@angular/forms';
import { StaticProvider } from '@angular/core';
import { CONTROL_PROPERTIES } from '../components/util/inject-token';
import { QuestionDefinition } from '../components/question-definition';
import { Question } from '../model';

export function createDefaultProviders(control: AbstractControl, question?: Question): StaticProvider[] {
  const providers: StaticProvider[] = [];
  if (isQuestionProvider(control)) {
    providers.push({
      provide: QuestionDefinition,
      useValue: new QuestionDefinition(question ? question : control.question)
    });
    providers.push({
      provide: CONTROL_PROPERTIES,
      useValue: question ? question.properties ?? {} : control.question?.properties ?? {}
    });
  }
  return providers;
}

interface QuestionProvider {
  question: Question;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isQuestionProvider(obj: any): obj is QuestionProvider {
  return 'question' in obj;
}
