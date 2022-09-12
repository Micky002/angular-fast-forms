# Custom control

To add a custom control you have to create a new angular component via the angular 
[CLI](https://angular.io/cli/generate#component) or manually. These component must extend the
`BaseFormControlComponent<T = QuestionProperties, C = AbstractControl>` abstract class. If the control has custom
properties then the type parameter `T` should declare this type. `C` should define either the angular `FormControl` 
or a custom subtype of this. The last step is to register the control.



## Example

In this example a basic input control is registered.



### Step 1 - Create component

```typescript
@Component({
  selector: 'my-custom-input',
  templateUrl: './input.component.html'
})
export class InputComponent extends BaseFormControlComponent<InputProperties, FormControl> {

  public get type(): string {
    switch (this.format) {
      case 'text':
        return 'text';
      case 'number':
        return 'number';
      case 'currency':
        return 'number';
      default:
        return 'text';
    }
  }

  public get format(): InputFormat {
    return this.properties.format ?? 'text';
  }
}

interface InputProperties {
  format?: InputFormat;
}
```

```html
<mat-form-field>
  <mat-label *ngIf="question.label">{{question.label}}</mat-label>
  <input #inputElement [formControl]="control" [type]="type" matInput>
  <mat-icon *ngIf="format === 'currency'" matSuffix>€</mat-icon>
  <mat-error *ngIf="control.hasError('required')">
    Value is required
  </mat-error>
</mat-form-field>
```



### Step 2 - Registration

It is possible to register the control via the helper method `registerControl(type, component)` or manually.


#### Register via helper method

```typescript
@NgModule({
  providers: [
    registerControl('custom-input', InputComponent)
  ]
})
export class CustomFormControlModule {
}
```


#### Register manually

```typescript
@NgModule({
  providers: [
    {
      provide: DYNAMIC_FORM_CONTROL,
      multi: true,
      useValue: {
        type: 'custom-input',
        component: InputComponent
      } as DynamicFormDefinition
    }
  ]
})
export class CustomFormControlModule {
}
```

