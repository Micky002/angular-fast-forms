import { QuestionProperties } from "../../question.properties"

export interface FastFormRowProperties extends QuestionProperties {
  size: {
    [key: string]: {
      percent: number
    }
  }
}