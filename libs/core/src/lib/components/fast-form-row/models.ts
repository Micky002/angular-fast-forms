import { QuestionProperties } from "../../model";

export interface FastFormsRowProperties extends QuestionProperties {
  size: {
    [key: string]: {
      percent: number
    }
  }
}
