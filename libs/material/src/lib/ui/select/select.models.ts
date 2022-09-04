import { QuestionProperties } from '@ngx-fast-forms/core';

export interface SelectOption {
  value: string | number;
  name: string;
}

export interface SelectProperties extends QuestionProperties {
  emptyOptionName?: string
  emptyOptionValue?: string | number
  optionsEndpoint?: string;
  options?: Array<SelectOption>;
}
