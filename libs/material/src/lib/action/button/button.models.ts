import { QuestionProperties } from '@ngx-fast-forms/core';

export type ButtonType = 'icon-button' | 'text-button'

export interface ButtonProperties extends QuestionProperties {
  type: ButtonType;
  text?: string;
  icon?: string;
}
