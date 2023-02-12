import { AbstractControlOptions, FormControlOptions, FormControlState } from '@angular/forms';
import { AnyQuestion, ArrayQuestion, BasicQuestionV2, QuestionV2, WrapperProvider } from '../service/fast-form-builder';
import { FormControlType } from '@ngx-fast-forms/core';

export class ControlWrapperV2 {


  constructor(
      private _controlType: FormControlType,
      private _initialState: FormControlState<any> | any,
      private _question: BasicQuestionV2 & FormControlOptions,
      private _arrayQuestion: QuestionV2 | null,
      private _groupQuestions: { [key: string]: AnyQuestion } | null,
      private _groupControls?: { [key: string]: WrapperProvider }
  ) {
  }

  get controlType(): FormControlType {
    return this._controlType;
  }

  get initialState(): FormControlState<any> | any {
    return this._initialState;
  }

  get question(): BasicQuestionV2 & FormControlOptions & { type: string } {
    return this._question as any;
  }

  get arrayQuestion(): QuestionV2 {
    if (this._arrayQuestion) {
      return this._arrayQuestion;
    } else {
      throw new Error('No array question defined.');
    }
  }

  get groupQuestion(): BasicQuestionV2 & FormControlOptions {
    if (this._groupQuestions) {
      return this._groupQuestions;
    } else {
      throw new Error('No array question defined.');
    }
  }

  get groupControls(): { [key: string]: WrapperProvider } {
    return this._groupControls ?? {};
  }

  public static fromControl(initialState: FormControlState<any> | any, question: BasicQuestionV2 & FormControlOptions): ControlWrapperV2 {
    return new ControlWrapperV2(
        'control',
        initialState,
        question,
        null,
        null
    );
  }

  public static fromGroup(question: BasicQuestionV2 & AbstractControlOptions, groupQuestions: { [key: string]: AnyQuestion }, groupDef?: { [key: string]: any }): ControlWrapperV2 {
    return new ControlWrapperV2(
        'group',
        null,
        question,
        null,
        groupQuestions,
        groupDef
    );
  }

  public static fromArray(
      question: ArrayQuestion,
      arrayQuestion: QuestionV2): ControlWrapperV2 {
    return new ControlWrapperV2(
        'array',
        null,
        question,
        arrayQuestion,
        null
    );
  }
}
