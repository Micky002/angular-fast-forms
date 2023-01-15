import {
  ComponentFactory,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injector,
  NgModuleRef,
  TemplateRef,
  Type,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

export class ViewContainerRefMock extends ViewContainerRef {

  get element(): ElementRef {
    throw new Error('Not implemented in mock');
  }

  get injector(): Injector {
    throw new Error('Not implemented in mock');
  }

  get length(): number {
    return 0;
  }

  get parentInjector(): Injector {
    throw new Error('Not implemented in mock');
  }

  clear(): void {
  }

  createComponent<C>(componentType: Type<C>, options?: { index?: number; injector?: Injector; ngModuleRef?: NgModuleRef<unknown>; environmentInjector?: EnvironmentInjector | NgModuleRef<unknown>; projectableNodes?: Node[][] }): ComponentRef<C>;

  createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], environmentInjector?: EnvironmentInjector | NgModuleRef<any>): ComponentRef<C>;

  createComponent(componentType: unknown, options?: { index?: number; injector?: Injector; ngModuleRef?: NgModuleRef<unknown>; environmentInjector?: EnvironmentInjector | NgModuleRef<unknown>; projectableNodes?: Node[][] } | number, injector?: Injector, projectableNodes?: any[][], environmentInjector?: EnvironmentInjector | NgModuleRef<any>): ComponentRef<unknown> {
    throw new Error('Not implemented in mock');
  }

  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, options?: { index?: number; injector?: Injector }): EmbeddedViewRef<C>;

  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;

  createEmbeddedView(templateRef: unknown, context?: unknown, options?: { index?: number; injector?: Injector } | number): EmbeddedViewRef<unknown> {
    throw new Error('Not implemented in mock');
  }

  detach(index?: number): ViewRef | null {
    throw new Error('Not implemented in mock');
  }

  get(index: number): ViewRef | null {
    throw new Error('Not implemented in mock');
  }

  indexOf(viewRef: ViewRef): number {
    return 0;
  }

  insert(viewRef: ViewRef, index?: number): ViewRef {
    throw new Error('Not implemented in mock');
  }

  move(viewRef: ViewRef, currentIndex: number): ViewRef {
    throw new Error('Not implemented in mock');
  }

  remove(index?: number): void {
  }
}
