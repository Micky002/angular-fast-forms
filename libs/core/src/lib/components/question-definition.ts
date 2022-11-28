import { Question, QuestionProperties, ValidationOptions } from '../model';

export class QuestionDefinition {
  public readonly id: string;
  public readonly label?: string;
  public readonly hidden?: boolean;
  public readonly validation?: ValidationOptions;
  public readonly properties?: QuestionProperties;
  public readonly defaultValue?: string | number;
  public readonly children?: Question[];

  constructor(question: BasicQuestion) {
    this.id = question.id;
    this.label = question.label;
    this.hidden = question.hidden;
    this.validation = question.validation;
    this.properties = question.properties;
    this.defaultValue = question.defaultValue;
    this.children = question.children;
  }
}

export interface BasicQuestion {
  id: string;
  label?: string;
  hidden?: boolean;
  validation?: ValidationOptions;
  properties?: QuestionProperties;
  defaultValue?: string | number;
  children?: Question[];
}
