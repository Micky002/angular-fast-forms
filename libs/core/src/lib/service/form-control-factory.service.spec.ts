import { TestBed } from '@angular/core/testing';

import { ControlFactoryService } from './control-factory.service';
import { Component } from '@angular/core';
import { FastFormControlComponent } from '../control/abstract-control.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'aff-testing-control',
  template: ''
})
class DummyFormComponent extends FastFormControlComponent {

}

describe('FormControlFactoryService', () => {
  let service: ControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ControlFactoryService
      ]
    });
    service = TestBed.inject(ControlFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create control if nothing is registered', () => {
    const control = service.createControl('test-control');
    expect(control).toBeDefined();
  });

  it('should create control from registered factory', () => {
    service.componentRegistry = [{
      type: 'test-control',
      component: DummyFormComponent,
      controlFactory: () => new FormControl('initial-state')
    }];
    const control = service.createControl('test-control');
    expect(control).toBeDefined();
    expect(control.value).toEqual('initial-state');
  });
});
