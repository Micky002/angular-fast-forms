# Angular Fast Forms

Angular Fast Forms (AFF) is an angular library which aims to improve development speed
when working with forms. In the current state is does only provide a minimal set of
material inputs out of the box, but you can create your own controls. It is compatible
with any ui library and the main goal of the library is the provide a framework for easy
control structure and usage of them. When you have defined and created your controls,
you will not need to write any html anymore to create your forms simply define them via
a well-structured config (JSON like) or the provided form builder in a declarative way.

**Example Project**

The repository includes
an [example project](https://github.com/Micky002/angular-fast-forms/tree/master/apps/material-example)
which can be started with `npm run start:material-example`.

**Storybook**

The repository includes a [storybook](https://github.com/Micky002/angular-fast-forms/tree/master/apps/storybook)
which can be started with `npm run start:storybook`.

## Core Features

* Create forms without any html
* Provide basic form components out of the box
* Easy way of creating new and custom controls
* Validation support
* Lazy loading support
* Supports JSON form definitions (also fetching them via HTTP)
* Small size, `core` package has only angular dependencies

## Work in progress

The documentation is still work in progress and incomplete. There is also an
[example project](https://github.com/Micky002/angular-fast-forms/tree/master/apps/material-example)
in the repository which can be used in addition to the documentation.
The example project should include an example for every feature provided in the library.
