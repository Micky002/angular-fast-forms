import { QuestionProperties } from '@ngx-fast-forms/core';

export type InputFormat = 'text' | 'number' | 'currency';

export interface InputProperties extends QuestionProperties {
  format?: InputFormat;
  attributes?: { [key: string]: string };
}
