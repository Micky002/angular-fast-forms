import { TestBed } from '@angular/core/testing';
import { ControlRegistry } from './control-registry.service';
import { FastFormsTestingModule } from '../../test/fast-forms-testing.module.test-util';
import { TestControlType } from '../../test/control-types.test-util';

describe('ControlRegistry', () => {
  let registry: ControlRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FastFormsTestingModule
      ]
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

  it('should validate registered components', () => {
    expect(() => new ControlRegistry([[InvalidControlComponent as any]]))
        .toThrowError('Control component must be decorated with [@Control] decorator.');
  });
});

class InvalidControlComponent {
}
