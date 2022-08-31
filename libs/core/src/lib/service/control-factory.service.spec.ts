import { TestBed } from '@angular/core/testing';

import { ControlFactoryService } from './control-factory.service';
import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { FormControl } from '@angular/forms';
import { ValidatorFactoryService } from '../validation/validator-factory.service';


@Component({
  selector: 'aff-testing-control',
  template: ''
})
class DummyFormComponent extends BaseFormControlComponent {

}

describe('ControlFactoryService', () => {
  let service: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ControlFactoryService,
        ValidatorFactoryService
      ]
    });
    service = TestBed.inject(ControlFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create control if nothing is registered', () => {
    const control = service.createAngularFormControl({type: 'test-control', id: 'test'});
    expect(control).toBeDefined();
  });

  it('should create control from registered factory', () => {
    service.componentRegistry = [{
      type: 'test-control',
      component: DummyFormComponent,
      controlFactory: () => new FormControl('initial-state')
    }];
    const control = service.createAngularFormControl({type: 'test-control', id: 'test'});
    expect(control).toBeDefined();
    expect(control.value).toEqual('initial-state');
  });
});
