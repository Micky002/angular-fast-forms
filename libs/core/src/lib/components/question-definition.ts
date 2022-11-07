export class QuestionDefinition {
  public readonly id: string;
  public readonly label?: string;
  public readonly hidden?: boolean;

  constructor(question: BasicQuestion) {
    this.id = question.id;
    this.label = question.label;
    this.hidden = question.hidden;
  }
}

export interface BasicQuestion {
  id: string;
  label?: string;
  hidden?: boolean;
}
