import { AbstractControlOptions, FormControlOptions, FormControlState } from '@angular/forms';
import { FormControlType } from '../model';
import { TypedQuestion } from '../question-definition';

//TODO: Remove this and render with old render service and old control wrapper
export class ControlWrapperV2 {


  constructor(
      private _controlType: FormControlType,
      private _initialState: FormControlState<any> | any,
      private _question: TypedQuestion & (AbstractControlOptions | FormControlOptions),
      private _arrayQuestion: ControlWrapperV2 | null,
      private _groupQuestions: { [key: string]: ControlWrapperV2 } | null
  ) {
  }

  get controlType(): FormControlType {
    return this._controlType;
  }

  get initialState(): FormControlState<any> | any {
    return this._initialState;
  }

  get question(): TypedQuestion & (AbstractControlOptions | FormControlOptions) {
    return this._question as any;
  }

  get arrayQuestion(): ControlWrapperV2 {
    if (this._arrayQuestion) {
      return this._arrayQuestion;
    } else {
      throw new Error('No array question defined.');
    }
  }

  get groupQuestion(): { [key: string]: ControlWrapperV2 } {
    if (this._groupQuestions) {
      return this._groupQuestions;
    } else {
      throw new Error('No group question defined.');
    }
  }

  public static fromControl(initialState: FormControlState<any> | any, opts: TypedQuestion & FormControlOptions): ControlWrapperV2 {
    return new ControlWrapperV2(
        'control',
        initialState,
        opts,
        null,
        null
    );
  }

  public static fromGroup(question: TypedQuestion & AbstractControlOptions, groupQuestions: { [key: string]: ControlWrapperV2 }): ControlWrapperV2 {
    return new ControlWrapperV2(
        'group',
        null,
        question,
        null,
        groupQuestions
    );
  }

  public static fromArray(
      question: TypedQuestion & AbstractControlOptions,
      arrayQuestion?: ControlWrapperV2): ControlWrapperV2 {
    return new ControlWrapperV2(
        'array',
        null,
        question,
        arrayQuestion ?? null,
        null
    );
  }
}
