# Register custom Controls

1. Import `FastFormsModule` to your module imports
2. Create a new angular component. Extend the component from the control base class `BaseFormControlComponent`.
   The `InputProperties`
   is just an example, if your component does not have custom properties you can omit this.

```typescript
import { BaseFormControlComponent } from './base-control.component';

@Component({
  selector: 'my-custom-input',
  templateUrl: './input.component.html'
})
export class InputComponent extends BaseFormControlComponent<InputProperties> implements OnInit {

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

3. Add the control html template (see the following for an angular material input example)

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

4. Register the control in your module

```typescript
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FastFormsCoreModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [
    InputComponent,
  ],
  exports: [
    FastFormsCoreModule
  ],
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
