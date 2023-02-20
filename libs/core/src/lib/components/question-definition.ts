import { Question, ValidationOptions } from '../model';

export class QuestionDefinition<T = any> {
  public readonly id: string;
  public readonly label?: string;
  public readonly hidden?: boolean;
  public readonly disabled?: boolean;
  public readonly validation?: ValidationOptions;
  public readonly properties?: T;
  public readonly defaultValue?: string | number;
  public readonly children?: Question[];

  constructor(question: BasicQuestion) {
    this.id = question.id;
    this.label = question.label;
    this.hidden = question.hidden;
    this.disabled = question.disabled;
    this.validation = question.validation;
    this.properties = question.properties as T;
    this.defaultValue = question.defaultValue;
    this.children = question.children;
  }
}

export interface BasicQuestion {
  id: string;
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: unknown;
  defaultValue?: string | number;
  children?: Question[];
}
