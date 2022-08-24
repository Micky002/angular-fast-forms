[![CircleCI](https://dl.circleci.com/status-badge/img/null/Micky002/angular-fast-forms/tree/master.svg?style=svg&circle-token=a0e7c82872929927eeba1d2316afb4aa8c8fd546)](https://dl.circleci.com/status-badge/redirect/null/Micky002/angular-fast-forms/tree/master)

# Angular Fast Forms

Angular Fast Forms (AFF) is an angular library which aims to improve development speed
when working with forms. You will not need to write any html anymore to create your forms
simply define them via a well structured config. It is extendable to use your own
form components.

## Core Features

* Create forms without any html
* Provide basic form components out of the box
* Validation support
* Custom form components and validators
* Lazy loading support
* Supports JSON form definitions (also fetching them via HTTP)
* Small size

## Getting started

Install the library in your angular project

```bash
npm i @ngx-fast-forms/core
```

Select one of the provided ui component libraries and also install it:

* `@ngx-fast-forms/material`

Create your first fast form:

```html
<aff-form-group [form]="form"></aff-form-group>
```

```ts
export class ExampleComponent {

  public form!: FastFormGroup;

  constructor(private fastFormService: FastFormsService) {
    this.form = fastFormService.createDynamicForm([{
      id: 'first-input',
      type: 'input',
      label: 'Example input'
    }, {
      id: 'second-input',
      type: 'input',
      label: 'Second input'
    }]);
  }
}
```
