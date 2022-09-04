export interface SelectOption {
  value: string | number;
  name: string;
}

export interface SelectProperties {
  emptyOptionName?: string
  emptyOptionValue?: string | number
  optionsEndpoint?: string;
  options?: Array<SelectOption>;
}
