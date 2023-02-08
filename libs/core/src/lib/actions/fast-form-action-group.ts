import { FormActionControl } from './fast-form-action';

export interface FormActionGroup {

  get disabled(): boolean;

  get(path: string): FormActionControl | FormActionGroup | null;

  disable(): void;

  enable(): void;
}
