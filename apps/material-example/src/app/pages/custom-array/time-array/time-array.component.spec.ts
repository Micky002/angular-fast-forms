import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeArrayComponent } from './time-array.component';
import { ActionService, FastFormArray, FORM_CONTROL } from '@ngx-fast-forms/core';
import { Provider } from '@angular/core';
import { ControlFactoryService } from '../../../../../../../libs/core/src/lib/service/control-factory.service';

describe('TimeArrayComponent', () => {
  let component: TimeArrayComponent;
  let fixture: ComponentFixture<TimeArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeArrayComponent
      ],
      providers: [
        ActionService,
        ControlFactoryService,
        {
          provide: FORM_CONTROL,
          deps: [ControlFactoryService],
          useFactory: (controlFactory: ControlFactoryService) => new FastFormArray({
            id: 'name',
            type: 'dummy-input'
          }, controlFactory)
        } as Provider
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
