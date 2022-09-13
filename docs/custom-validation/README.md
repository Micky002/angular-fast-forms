# Validation

Every question can have validation options. All basic angular validators are
included in the `core` package. There is also the possibility to register
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

## Custom validators

### Implementation

The sections [Sync Validator](sync.md) and [Async Validator](async.md) will show how to implement a 
validator. The following sections should be read before. It contains general info about custom validators.

### Arguments

A validator can have arguments. The arguments are separated with a `:` from the validator id. If there are multiple
arguments they can be split with `,`.

See the following examples of possible ids:
* `custom-vali:test` - `custom-vali` would be the id and the validator will get
  an argument array of `['test']`.
* `my-validator` - validator without arguments
* `my-complicated-validator:test,value,two` - validator with 3 arguments, the
  arguments will look like `['test', 'value', 'two']`


### Registration

To register the validator it is required to specify it either in the root module or a child module.

```typescript
FastFormsModule.forRoot({
  validators: [
    AsyncRequiredValidator
  ]
})

// OR

FastFormsModule.forChild({
  validators: [
    AsyncRequiredValidator
  ]
})
```

### Usage

The validator can then be used in a question definition. It is possible to specify a single
custom validator or an array of validators.

```typescript
const question: Question =
  {
    id: 'test-input',
    type: 'input',
    label: 'Custom async required',
    validation: {
      custom: ['custom-start-with:testing', 'another-validator'],
      customAsync: 'custom-async-required'
    }
  }
```
