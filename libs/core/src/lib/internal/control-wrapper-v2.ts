import { AbstractControlOptions, FormControlOptions, FormControlState } from '@angular/forms';
import { BasicQuestionV2 } from '../service/fast-form-builder';
import { FormControlType } from '@ngx-fast-forms/core';

export class ControlWrapperV2 {


  constructor(
      private _controlType: FormControlType,
      private _initialState: FormControlState<any> | any,
      private _question: BasicQuestionV2 & FormControlOptions,
      private _arrayQuestion: BasicQuestionV2 & FormControlOptions | null,
      private _groupDef?: { [key: string]: any }
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

  get arrayQuestion(): BasicQuestionV2 & FormControlOptions {
    if (this._arrayQuestion) {
      return this._arrayQuestion;
    } else {
      throw new Error('No array question defined.');
    }
  }

  get groupDef(): any {
    return this._groupDef;
  }

  public static fromControl(initialState: FormControlState<any> | any, question: BasicQuestionV2 & FormControlOptions): ControlWrapperV2 {
    return new ControlWrapperV2(
        'control',
        initialState,
        question,
        null
    );
  }

  public static fromGroup(question: BasicQuestionV2 & AbstractControlOptions, groupDef?: { [key: string]: any }): ControlWrapperV2 {
    return new ControlWrapperV2(
        'group',
        null,
        question,
        null,
        groupDef
    );
  }

  public static fromArray(
      initialState: FormControlState<any> | any,
      arrayQuestion: BasicQuestionV2 & FormControlOptions,
      question: BasicQuestionV2 & FormControlOptions): ControlWrapperV2 {
    return new ControlWrapperV2(
        'array',
        null,
        question,
        arrayQuestion
    );
  }
}
