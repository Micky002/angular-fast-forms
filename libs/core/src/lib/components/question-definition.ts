import { BasicQuestion, ValidationOptions } from '../model';
import { QuestionProperties } from '../question.properties';

export class QuestionDefinition {
  public readonly id: string;
  public readonly label?: string;
  public readonly hidden?: boolean;
  public readonly validation?: ValidationOptions;
  public readonly properties?: QuestionProperties;
  public readonly defaultValue?: string | number;

  constructor(question: BasicQuestion) {
    this.id = question.id;
    this.label = question.label;
    this.hidden = question.hidden;
    this.validation = question.validation;
    this.properties = question.properties;
    this.defaultValue = question.defaultValue;
  }
}

