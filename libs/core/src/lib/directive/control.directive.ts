import { Directive, Injector, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { FastFormControl } from '../control/fast-form-control';
import { FormRenderService } from '../internal/form-render.service';

@Directive({
  selector: '[fastFormControlName]'
})
export class ControlNameDirective implements OnInit {

  @Input() fastFormControlName!: string;

  constructor(private injector: Injector,
              private groupDirective: FormGroupDirective,
              private formRenderer: FormRenderService,
              private viewContainer: ViewContainerRef) {
  }

  ngOnInit(): void {
    const formGroup = this.groupDirective.control;
    if (formGroup.contains(this.fastFormControlName)) {
      const subControl = formGroup.get(this.fastFormControlName);
      if (subControl instanceof FastFormControl) {
        this.formRenderer.renderControl(
            this.viewContainer,
            subControl,
            {
              injector: this.injector
            }
        );
      }
    }
  }
}

@Directive({
  selector: '[fastFormControl]'
})
export class ControlDirective implements OnInit {

  @Input() fastFormControl!: FastFormControl;

  constructor(private injector: Injector,
              private formRenderer: FormRenderService,
              private viewContainer: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.formRenderer.renderControl(
        this.viewContainer,
        this.fastFormControl,
        {
          injector: this.injector
        }
    );
  }
}
