export type InputFormat = 'text' | 'number' | 'currency';

export interface InputProperties {
  format?: InputFormat;
  attributes?: { [key: string]: string };
}
