import { Question, QuestionProperties, SingleQuestion, ValidationOptions } from '../model';

export class QuestionDefinition {
  public readonly id: string;
  public readonly label?: string;
  public readonly hidden?: boolean;
  public readonly disabled?: boolean;
  public readonly validation?: ValidationOptions;
  public readonly properties?: QuestionProperties;
  public readonly defaultValue?: string | number;
  public readonly children?: Question[];

  constructor(question: SingleQuestion | Question) {
    if ('id' in question) {
      this.id = question.id;
    } else {
      this.id = '';
    }
    this.label = question.label;
    this.hidden = question.hidden;
    this.disabled = question.disabled;
    this.validation = question.validation;
    this.properties = question.properties ?? {};
    this.defaultValue = question.defaultValue;
    if ('children' in question) {
      this.children = question.children;
    } else {
      this.children = [];
    }
  }
}

export interface BasicQuestion {
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: QuestionProperties;
  defaultValue?: string | number;
}
