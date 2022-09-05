# Validation

Every question can have validation options. All basic angular validators are
included in the core package. There is also the possibility to register
custom `sync` and `async` validators.

## Included validation options

* `required`: boolean
* `min`: number
* `minLength`: number
* `max`: number
* `maxLength`: number
* `email`: boolean
* `pattern`: string or regular expression

### Example

```typescript
const question: Question = {
  id: 'example input',
  type: 'input',
  label: 'Row 2',
  validation: {
    minLength: 5,
    required: true,
    min: 10,
    minLength: 20,
    max: 30,
    maxLength: 34,
    email: true,
    pattern: 'testing' | /test+3/
  }
}
```

## Register custom sync validators

There are two types of validator, with and without arguments. Both are registered
as angular provider.

### With Arguments

```typescript
registerValidatorFnWithArgs('custom-start-with', args => {
  return control => {
    if (!(control.value + '').startsWith(args[0])) {
      return {
        startWith: {
          requiredStart: 'test'
        }
      };
    }
    return null;
  };
})
```

### Without Arguments

```typescript

registerValidatorFn('custom-required', control => {
  return control => {
    if (control.value) {
      return null;
    } else {
      return {
        required: true
      }
    }
  };
})
```
