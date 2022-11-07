# Form Control

To add a form control you have to create a new angular component via the angular
[CLI](https://angular.io/cli/generate#component) or manually. It must be annotated with `@Control` and a type must be given.
See the following example for more information.

## Example

In this example a basic input control is registered.

### Step 1 - Create component

```typescript
@Control({
  type: 'my-input',
})
@Component({
  selector: 'custom-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  
  constructor(
    @Inject(FORM_CONTROL) public control: FormControl,
    public question: QuestionDefinition,
    @Inject(CONTROL_PROPERTIES) private properties: InputProperties
  ) {}

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
  <input #inputElement [formControl]="control" [type]="type" matInput />
  <mat-icon *ngIf="format === 'currency'" matSuffix>€</mat-icon>
  <mat-error *ngIf="control.hasError('required')"> Value is required </mat-error>
</mat-form-field>
```

### Step 2 - Registration

The custom control component must be registered in the `FastFormsModule`. See
the following example.

**Root Module**

```typescript
FastFormsModule.forRoot({
  controls: [InputComponent],
});
```

**Child Module**

```typescript
FastFormsModule.forChild({
  controls: [InputComponent],
});
```
