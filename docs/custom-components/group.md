# Custom group

To add a custom form group you have to create a new angular component via the angular
[CLI](https://angular.io/cli/generate#component) or manually. These component must extend the
`BaseFormGroupComponent<T = QuestionProperties>` abstract class. If the group has custom
properties then the type parameter `T` should declare this type. 

## Options

A form group usually consists of nested input fields, so it is required to create this nested 
controls in the form group. This can be accomplished either by creating a static method 
`controlFactory` in the component which will be called by the library or by setting the`groupFactory` 
option property when registering the group via the `registerGroup` method.


## Example

In this example a basic group with two input fields is registered.



### Step 1 - Create component

TBD controlFactory

```typescript
@Component({
  selector: 'frontend-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
})
export class DateRangeInputComponent extends BaseFormGroupComponent {

  public static controlFactory(question: Question) {
    return new FormGroup({
      from: new FormControl(),
      until: new FormControl()
    });
  }

  get dateRangeFromGroup(): FormGroup {
    return this.formGroup.get('date_range') as FormGroup;
  }
}
```

```html
<div [formGroup]="formGroup" class="date-range">
  <mat-form-field>
    <mat-label>From</mat-label>
    <input formControlName="from" [matDatepicker]="pickerFrom" matInput>
    <mat-hint>DD.MM.YYYY</mat-hint>
    <mat-datepicker-toggle [for]="pickerFrom" matSuffix></mat-datepicker-toggle>
    <mat-datepicker #pickerFrom></mat-datepicker>
  </mat-form-field>
  <mat-form-field>
    <mat-label>Until</mat-label>
    <input formControlName="until" [matDatepicker]="pickerUntil" matInput>
    <mat-hint>DD.MM.YYYY</mat-hint>
    <mat-datepicker-toggle [for]="pickerUntil" matSuffix></mat-datepicker-toggle>
    <mat-datepicker #pickerUntil></mat-datepicker>
  </mat-form-field>
</div>
```



### Step 2 - Registration

It is possible to register the group via the helper method `registerGroup(type, component, options)` or manually.


#### Register via helper method

```typescript
@NgModule({
  providers: [
    registerGroup('date-range', DateRangeInputComponent)
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
        type: 'date-range',
        component: DateRangeInputComponent,
      } as DynamicFormDefinition
    }
  ]
})
export class CustomFormControlModule {
}
```

