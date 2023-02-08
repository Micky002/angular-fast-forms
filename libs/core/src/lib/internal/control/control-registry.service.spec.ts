import { TestBed } from '@angular/core/testing';
import { ControlRegistry } from './control-registry.service';
import { DummyInputModule } from '../../test/dummy-input.module.test-util';

describe('ControlRegistry', () => {
  let registry: ControlRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DummyInputModule
      ]
    });
    registry = TestBed.inject(ControlRegistry);
  });

  it('should create', () => {
    expect(registry).toBeTruthy();
  });

  it('should find registered control', () => {
    expect(registry.hasItem('dummy-input')).toBeTruthy();
    expect(registry.hasItem('not-registered')).toBeFalsy();
  });

  it('should map to form definition', () => {
    const def = registry.getDefinition('dummy-input');
    expect(def.controlFactory).toBeUndefined();
    expect(def.type).toEqual('dummy-input');
    expect(def.inline).toBeFalsy();
    expect(def.component).toBeDefined();
    expect(def.internalType).toEqual('control');
  });

  it('should check if control has control factory', () => {
    expect(registry.hasControlFactory('dummy-input')).toBeFalsy();
    expect(registry.hasControlFactory('invalid')).toBeFalsy();
  });

  it('should validate registered components', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => new ControlRegistry([[InvalidControlComponent as any]]))
        .toThrowError('Control component must be decorated with [@Control] decorator.');
  });
});

class InvalidControlComponent {
}
