import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Question, SingleQuestion } from '../model';

@Injectable()
export abstract class ControlFactoryService {

  public abstract createFromQuestions(parent: FormGroup, questions: Array<Question>): void;

  public abstract createFromQuestion(parent: FormGroup | FormArray, question: Question, index?: number): void;

  public abstract createFormControl(question: Question): AbstractControl;

  public abstract control(question: SingleQuestion): AbstractControl;
}
