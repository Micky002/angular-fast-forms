import { SelectOption } from './select-option.model';

export interface SelectProperties {
  emptyOptionName?: string
  emptyOptionValue?: string | number
  optionsEndpoint?: string;
  options?: Array<SelectOption>;
}
