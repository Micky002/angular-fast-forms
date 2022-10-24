import { QuestionProperties } from "@ngx-fast-forms/core";

export interface ButtonProperties extends QuestionProperties {
  type: 'icon-button' | 'text-button'
  text?: string;
  icon?: string;
}
