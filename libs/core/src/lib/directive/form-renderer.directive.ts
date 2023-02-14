import { Directive, Injector, Input, OnInit, Optional, Renderer2, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { FormRenderService } from '../internal/form-render.service';

@Directive({
  selector: '[affRenderer],[renderControl]'
})
export class FormRendererDirective implements OnInit {

  @Input() renderControl: AbstractControl | null = null;

  constructor(
      private viewContainerRef: ViewContainerRef,
      private renderer: Renderer2,
      private renderService: FormRenderService,
      private injector: Injector,
      @Optional() private group?: FormGroupDirective) {
  }

  ngOnInit(): void {
    if (this.renderControl) {
      this.render(this.renderControl);
    } else if (this.group?.control) {
      this.render(this.group.control);
    }
  }

  private render(control: AbstractControl) {
    const isHtmlElement = this.viewContainerRef.element.nativeElement instanceof HTMLElement;
    let componentRef = this.renderService.renderOnly(this.viewContainerRef, control, {injector: this.injector});
    if (isHtmlElement) {
      this.renderer.appendChild(this.viewContainerRef.element.nativeElement, componentRef.location.nativeElement);
    }
  }
}
