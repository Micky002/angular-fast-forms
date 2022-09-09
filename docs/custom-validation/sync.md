# Sync validator

## Register custom sync validators

There are two types of validator, with and without arguments. Both are registered
as angular provider. Two small helper methods can be used to simplify the 
registration process. The `registerValidatorFn` for validators without any
arguments and the `registerValidatorFnWithArgs` for ones with arguments.

### Arguments

The arguments are separated with a `:` from the validator id. If there are multiple
arguments they can be split with `,`.

See the following examples of possible ids:
* `custom-vali:test` - `custom-vali` would be the id and the validator will get
  an argument array of `['test']`.
* `my-validator` - validator without arguments
* `my-complicated-validator:test,value,two` - validator with 3 arguments, the
  arguments will look like `['test', 'value', 'two']`

### Examples

```typescript
// register validator without arguments
registerValidatorFn('custom-required', control => {
  if (control.value) {
    return null;
  } else {
    return {
      required: true
    };
  }
})

// register validator with arguments
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
