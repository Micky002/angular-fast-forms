# Form Group

A form control group with multiple controls is similar to a
[custom control](control). To add multiple inputs to a form group it is required
to add a control factory to the component. See the following example for more information.

## Example

### Step 1 - Create component

```typescript
@Control({
  type: 'date-range',
})
@Component({
  selector: 'date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
})
export class DateRangeInputComponent {
  
  @ControlFactory()
  public static controlFactory(question: Question) {
    return new FormGroup({
      from: new FormControl(),
      until: new FormControl(),
    });
  }

  constructor(@Inject(FORM_CONTROL) public control: FormGroup) {}
}
```

```html
<div [formGroup]="control" class="date-range">
  <mat-form-field>
    <mat-label>From</mat-label>
    <input [matDatepicker]="pickerFrom" formControlName="from" matInput />
    <mat-hint>DD.MM.YYYY</mat-hint>
    <mat-datepicker-toggle [for]="pickerFrom" matSuffix></mat-datepicker-toggle>
    <mat-datepicker #pickerFrom></mat-datepicker>
  </mat-form-field>
  <mat-form-field>
    <mat-label>Until</mat-label>
    <input [matDatepicker]="pickerUntil" formControlName="until" matInput />
    <mat-hint>DD.MM.YYYY</mat-hint>
    <mat-datepicker-toggle [for]="pickerUntil" matSuffix></mat-datepicker-toggle>
    <mat-datepicker #pickerUntil></mat-datepicker>
  </mat-form-field>
</div>
```

### Step 2 - Registration

The custom control component must be registered in the `FastFormsModule`. See
the following example.

**Root Module**

```typescript
FastFormsModule.forRoot({
  controls: [DateRangeInputComponent],
});
```

**Child Module**

```typescript
FastFormsModule.forChild({
  controls: [DateRangeInputComponent],
});
```
