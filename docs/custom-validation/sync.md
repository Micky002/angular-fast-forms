# Sync validator

## Creation

A custom sync validator can be created with a validator factory seen in the following example.

```typescript
@Validator({
  id: 'custom-required',
  type: 'sync'
})
@Injectable()
export class CustomRequiredValidator implements BaseValidator {

  createValidator(args: string[]): ValidatorFn {
    return control => {
      if (control.value) {
        return null;
      } else {
        return {
          required: true
        };
      }
    };
  }
}
```
