import { TestBed } from '@angular/core/testing';

import { FormControlFactoryService } from './form-control-factory.service';
import { Component } from '@angular/core';
import { FastFormControl } from '../fast-form-control';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'testing-control',
  template: ''
})
class DummyFormComponent extends FastFormControl {

}

describe('FormControlFactoryService', () => {
  let service: FormControlFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormControlFactoryService
      ]
    });
    service = TestBed.inject(FormControlFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create control if nothing is registered', () => {
    const control = service.createControl('test-control');
    expect(control).toBeDefined();
  });

  it('should create control from registered factory', () => {
    service.controlFactory = [{
      type: 'test-control',
      component: DummyFormComponent,
      controlFactory: () => new FormControl('initial-state')
    }];
    const control = service.createControl('test-control');
    expect(control).toBeDefined();
    expect(control.value).toEqual('initial-state');
  });
});
