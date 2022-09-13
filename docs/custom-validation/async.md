# Async validator

## Creation

A custom async validator can be created with a validator factory seen in the following example.

```typescript
@Validator({
  id: 'custom-async-required',
  type: 'async'
})
@Injectable()
export class AsyncRequiredValidator implements BaseAsyncValidator {

  createValidator(args: string[]): AsyncValidatorFn {
    return control => {
      return of({
        required: true
      })
    };
  }
}
```
