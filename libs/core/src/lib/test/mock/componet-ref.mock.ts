/* eslint-disable */
import { ChangeDetectorRef, ComponentRef, ElementRef, Injector, Type, ViewRef } from '@angular/core';

export class ComponetRefMock extends ComponentRef<unknown> {

  constructor(private _injector: Injector,
              private _component: unknown) {
    super();
  }

  get changeDetectorRef(): ChangeDetectorRef {
    throw new Error('Not implemented in mock');
  }

  get componentType(): Type<any> {
    throw new Error('Not implemented in mock');
  }

  get hostView(): ViewRef {
    throw new Error('Not implemented in mock');
  }

  get injector(): Injector {
    return this._injector;
  }

  get instance(): unknown {
    return undefined;
  }

  get location(): ElementRef {
    throw new Error('Not implemented in mock');
  }

  destroy(): void {
  }

  onDestroy(callback: Function): void {
  }

  setInput(name: string, value: unknown): void {
  }

}
