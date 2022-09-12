# Validation

Every question can have validation options. All basic angular validators are
included in the `core` package. There is also the possibility to register
custom `sync` and `async` validators.

* [Sync Validator](sync.md)
* [Async Validator](async.md)


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
