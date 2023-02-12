import { Directive, Injector, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { FormRenderService } from '../internal/form-render.service';

@Directive({
  selector: '[affRenderer]'
})
export class FormRendererDirective implements OnInit {

  constructor(
      private viewContainerRef: ViewContainerRef,
      private renderService: FormRenderService,
      private injector: Injector,
      @Optional() private group?: FormGroupDirective) {
  }

  ngOnInit(): void {
    console.log(this.viewContainerRef);
    console.log(this.group);
    this.renderService.renderOnly(this.viewContainerRef, this.group?.control, {injector: this.injector});
  }

}
