import { Directive, Injector, Input, OnInit, Optional, Renderer2, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { FormRenderService } from '../internal/form-render.service';

@Directive({
  selector: '[affRenderer],[renderControl],[renderControlName]'
})
export class FormRendererDirective implements OnInit {

  @Input() renderControl: AbstractControl | null = null;
  @Input() renderControlName: string | null = null;

  constructor(
      private viewContainerRef: ViewContainerRef,
      private renderer: Renderer2,
      private renderService: FormRenderService,
      private injector: Injector,
      @Optional() private groupDirective?: FormGroupDirective) {
  }

  ngOnInit(): void {
    const control = this.controlToRender;
    if (control) {
      this.render(control);
    }
  }

  private get controlToRender(): AbstractControl | null {
    let control: AbstractControl | null = null;
    if (this.renderControlName) {
      control = this.groupDirective?.form.controls[this.renderControlName] ?? null;
    } else if (this.renderControl) {
      control = this.renderControl;
    } else if (this.groupDirective?.control) {
      control = this.groupDirective.control;
    }
    return control;
  }

  private render(control: AbstractControl) {
    const isHtmlElement = this.viewContainerRef.element.nativeElement instanceof HTMLElement;
    const componentRef = this.renderService.renderOnly(this.viewContainerRef, control, {injector: this.injector});
    if (isHtmlElement) {
      this.renderer.appendChild(this.viewContainerRef.element.nativeElement, componentRef.location.nativeElement);
    }
  }
}
