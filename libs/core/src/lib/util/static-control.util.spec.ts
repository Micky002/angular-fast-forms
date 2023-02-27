import { staticControl } from './static-control.util';
import { FormControl } from '@angular/forms';
import { ControlDefinition, ControlFactory, hasControlWrapper } from '@ngx-fast-forms/core';

describe('static control util', () => {
  it('should create simple control', () => {
    const control = staticControl('Spring', {type: 'input'});
    expect(control).toBeInstanceOf(FormControl);
    expect(hasControlWrapper(control)).toBeTruthy();
    expect(control.value).toEqual('Spring');
  });

  it('should create default control', () => {
    const control = staticControl('Spring', {type: 'input'}, TestInputWithNoFactoryComponent);
    expect(control).toBeInstanceOf(FormControl);
    expect(hasControlWrapper(control)).toBeTruthy();
    expect(control.value).toEqual('Spring');
  });

  it('should create control via factory', () => {
    const control = staticControl('Spring', {type: 'input'}, TestInputComponent);
    expect(control).toBeInstanceOf(FormControl);
    expect(hasControlWrapper(control)).toBeTruthy();
    expect(control.value).toEqual('Spring-test');
  });
});

class TestInputComponent {

  @ControlFactory()
  static createControl(question: ControlDefinition) {
    return new FormControl(question.defaultValue + '-test');
  }
}

class TestInputWithNoFactoryComponent {

}
