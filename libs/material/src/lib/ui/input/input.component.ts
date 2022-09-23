import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseFormControlComponent, Control } from '@ngx-fast-forms/core';
import { InputFormat, InputProperties } from './input.models';

@Control({
  type: 'input,mat-input'
})
@Component({
  selector: 'aff-material-input',
  templateUrl: './input.component.html'
})
export class InputComponent extends BaseFormControlComponent<InputProperties, FormControl> implements OnInit {

  @ViewChild('inputElement', {static: true}) inputRef!: ElementRef<HTMLInputElement>;

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

  ngOnInit(): void {
    const inputElement = this.inputRef.nativeElement;
    if (this.properties.attributes) {
      Object.keys(this.properties.attributes).forEach(attribute => {
        const value = (this.properties.attributes || {})[attribute];
        inputElement.setAttribute(attribute, value)
      });
    }
  }
}
