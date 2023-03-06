import { FormRendererDirective } from './form-renderer.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DummyInputComponent } from '../test/dummy-input.test-util';
import { TestControlType } from '../test/control-types.test-util';
import { By } from '@angular/platform-browser';
import { FastFormBuilder } from '../service/fast-form-builder';
import { FastFormsModule } from '../fast-forms.module';

describe(FormRendererDirective.name, () => {


  it('should create an instance', () => {
    // const directive = new FormRendererDirective();
    // expect(directive).toBeTruthy();
  });

  describe('render via control name', () => {
    let component: RenderControlNameComponent;
    let fixture: ComponentFixture<RenderControlNameComponent>;
    let fb: FastFormBuilder;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [RenderControlNameComponent],
        imports: [
          ReactiveFormsModule,
          FastFormsModule.forRoot({
            controls: [DummyInputComponent]
          })
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(RenderControlNameComponent);
      component = fixture.componentInstance;
      fb = TestBed.inject(FastFormBuilder);
    });

    it('should render single control', () => {
      component.group = fb.group({}, {
        name: fb.dynamicControl('test', {type: TestControlType.INPUT}),
        age: fb.dynamicControl('test', {type: TestControlType.INPUT})
      });
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('#name-container'));
      expect(container).not.toBeNull();
      const input = container.query(By.css('#name')).nativeElement;
      expect(input.value).toEqual('test');
      expect(input.id).toEqual('name');
      expect(fixture.debugElement.query(By.css('#age'))).toBeNull();
    });
  });

  describe('real render', () => {
    let component: RenderControlComponent;
    let fixture: ComponentFixture<RenderControlComponent>;
    let fb: FastFormBuilder;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [RenderControlComponent],
        imports: [
          ReactiveFormsModule,
          FastFormsModule.forRoot({
            controls: [DummyInputComponent]
          })
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(RenderControlComponent);
      component = fixture.componentInstance;
      fb = TestBed.inject(FastFormBuilder);
    });

    it('should render single control', () => {
      component.control = fb.dynamicControl('test', {
        type: TestControlType.INPUT,
        id: 'name'
      }) as FormControl;
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('#name')).nativeElement;
      expect(input.value).toEqual('test');
      expect(input.id).toEqual('name');
    });

    it('should render group', () => {
      component.group = fb.group({}, {
        name: fb.dynamicControl('Hans', {type: TestControlType.INPUT}),
        firstName: fb.dynamicControl('Maier', {type: TestControlType.INPUT})
      });
      fixture.detectChanges();
      const nameInput = getById<HTMLInputElement>(fixture, 'name');
      expect(nameInput.value).toEqual('Hans');
      expect(nameInput.id).toEqual('name');
      const firstName = getById<HTMLInputElement>(fixture, 'firstName');
      expect(firstName.value).toEqual('Maier');
      expect(firstName.id).toEqual('firstName');
    });
  });
});


function getById<T>(fixture: ComponentFixture<unknown>, id: string): T {
  return fixture.debugElement.query(By.css(`#${id}`)).nativeElement;
}

@Component({
  template: `
    <div *ngIf="control">
      <ng-container [renderControl]="control"></ng-container>
    </div>
    <div *ngIf="group" [formGroup]="group" affRenderer></div>
  `
})
class RenderControlComponent {

  public control!: FormControl;
  public group!: FormGroup;
}

@Component({
  template: `
    <form *ngIf="group" [formGroup]="group">
      <div id="name-container" renderControlName="name"></div>
    </form>
  `
})
class RenderControlNameComponent {

  public group!: FormGroup;
}
