import { Directive, Injector, OnInit, Optional, Renderer2, ViewContainerRef } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { FormRenderService } from '../internal/form-render.service';

@Directive({
  selector: '[affRenderer]'
})
export class FormRendererDirective implements OnInit {

  constructor(
      private viewContainerRef: ViewContainerRef,
      private renderer: Renderer2,
      private renderService: FormRenderService,
      private injector: Injector,
      @Optional() private group?: FormGroupDirective) {
  }

  ngOnInit(): void {
    let componentRef = this.renderService.renderOnly(this.viewContainerRef, this.group?.control, {injector: this.injector});
    this.renderer.appendChild(this.viewContainerRef.element.nativeElement, componentRef.location.nativeElement);
  }
}
