import { Question } from "../model";

export class QuestionDefinition {
    public readonly label?: string;
    public readonly hidden?: boolean;
    
    constructor(question: BasicQuestion) {
        this.label = question.label;
        this.hidden = question.hidden;
    }
}

export interface BasicQuestion {
    label?: string;
    hidden?: boolean;
}