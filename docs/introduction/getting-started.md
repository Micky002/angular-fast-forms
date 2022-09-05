# Getting started

Install the library in your angular project

```bash
npm i @ngx-fast-forms/core
```

Select one of the provided ui component libraries and also install
it ([or add your own form components](#register-custom-controls)):

* `@ngx-fast-forms/material` (add `MaterialFastFormsModule` to your module imports)

Create your first fast form:

```html

<aff-form-group [form]="form"></aff-form-group>
```

```typescript
export class ExampleComponent {

  public form!: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.form = formService.createDynamicForm([{
      id: 'first-input',
      type: 'input', // depends on used ui component library or use the one registered by yourself
      label: 'Example input'
    }, {
      id: 'second-input',
      type: 'input',
      label: 'Second input'
    }]);
  }
}
```

Start the app and you should see the created form

![Github simple example](docs/pics/github-simple-example.png)
