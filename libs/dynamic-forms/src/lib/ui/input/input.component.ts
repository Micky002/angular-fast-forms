import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicFormControl } from '../../core/dynamic-form-control';
import { InputFormat, InputProperties } from './input.properties';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormControl } from "@angular/forms";

@UntilDestroy()
@Component({
  selector: 'code-input',
  templateUrl: './input.component.html'
})
export class InputComponent extends DynamicFormControl implements OnInit {

  @ViewChild('inputElement', {static: true}) inputRef!: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  public get type(): string {
    if (this.properties?.attributes && this.properties.attributes['type']) {
      return this.properties.attributes['type'];
    }
    switch (this.format) {
      case 'text':
        return 'text';
      case 'number':
        return 'number';
      case 'currency':
        return 'number';
      default:
        return 'text';
    }
  }

  public get format(): InputFormat {
    return this.properties.format || 'text';
  }

  private get properties(): InputProperties {
    return this.baseProperties as InputProperties;
  }

  ngOnInit(): void {
    const inputElement = this.inputRef.nativeElement;
    if (this.properties.attributes) {
      Object.keys(this.properties.attributes).forEach(attribute => {
        const value = (this.properties.attributes || {})[attribute];
        inputElement.setAttribute(attribute, value)
      });
    }
  }

  getControl(): FormControl {
    return this.control as FormControl;
  }
}
