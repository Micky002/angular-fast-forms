import { TestBed } from '@angular/core/testing';
import { ControlRegistry } from './control-registry.service';
import { FastFormsTestingModule } from '../../test/fast-forms-testing.module.test-util';
import { TestControlType } from '../../test/control-types.test-util';
import { Component } from '@angular/core';
import { Control } from '../../control/control.decorator';
import { FormControl } from '@angular/forms';
import { AFF_CONTROL_COMPONENTS } from '../../model';
import { ControlFactory } from '../../control/control-factory.decorator';

describe('ControlRegistry', () => {
  let registry: ControlRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FastFormsTestingModule
      ],
      providers: [{
        provide: AFF_CONTROL_COMPONENTS,
        useValue: [InputWithFactoryComponent],
        multi: true
      }]
    });
    registry = TestBed.inject(ControlRegistry);
  });

  it('should create', () => {
    expect(registry).toBeTruthy();
  });

  it('should find registered control', () => {
    expect(registry.hasItem(TestControlType.INPUT)).toBeTruthy();
    expect(registry.hasItem('not-registered')).toBeFalsy();
  });

  it('should map to form definition', () => {
    const def = registry.getDefinition(TestControlType.INPUT);
    expect(def.controlFactory).toBeUndefined();
    expect(def.type).toEqual(TestControlType.INPUT);
    expect(def.inline).toBeFalsy();
    expect(def.component).toBeDefined();
    expect(def.internalType).toEqual('control');
  });

  it('should check if control has control factory', () => {
    expect(registry.hasControlFactory(TestControlType.INPUT)).toBeFalsy();
    expect(registry.hasControlFactory('invalid')).toBeFalsy();
  });

  it('should return control factory', () => {
    const controlFactory = registry.getControlFactory('input-with-factory');
    expect(controlFactory).toBeDefined();
    expect(controlFactory).not.toBeNull();
  });

  it('should return null if control factory is not available', () => {
    const controlFactory = registry.getControlFactory(TestControlType.INPUT);
    expect(controlFactory).toBeNull();
    expect(controlFactory).toBeDefined();
  });

  it('should validate registered components', () => {
    expect(() => new ControlRegistry([[InvalidControlComponent as any]]))
        .toThrowError('Control component must be decorated with [@Control] decorator.');
  });
});

class InvalidControlComponent {
}

@Control({
  type: 'input-with-factory'
})
@Component({
  standalone: true,
  template: ``
})
class InputWithFactoryComponent {

  @ControlFactory()
  static createControl() {
    return new FormControl('initial value');
  }
}

