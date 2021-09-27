# ueq-element
A [WebComponent](https://www.webcomponents.org/) to support a configurable [User Experience Questionnaire (UEQ)](https://www.ueq-online.org).

<p align="center">
  <img src="https://github.com/daHaimi/ueq-element/actions/workflows/build-wc.yml/badge.svg" alt="Build WebComponent" />
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FdaHaimi%2Fueq-element?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FdaHaimi%2Fueq-element.svg?type=shield"/></a>
  <a href="https://www.npmjs.com/package/accessible-ueq"><img src="https://img.shields.io/npm/v/ueq-element.svg" alt="NPM Version"></a>
  <a href="https://www.webcomponents.org/element/ueq-element"><img src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" alt="Published on webcomponents.org" /></a>
</p>

It supports the default 26-item version and the shorter 8-item version (UEQ-S).
It allows for extensive configuration through custom [attributes](#Attributes).

> Support for [UEQ+](http://ueqplus.ueq-research.org/) is planned but not yet implemented.

## Live Example
<!--
```
<custom-element-demo>
  <template>
    <script type="module" src="lib/ueq-element.esm.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<ueq-element name="ueq-sample"></ueq-element>
```

## Installation
### Via CDN
You can use the released component directly via [jsDerlivr](https://jsdelivr.net/):
```html
...
<head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/ueq-element/lib/ueq-element.esm.js"></script>
</head>
...
```
### As a depedency
Or you can install it via `npm`:
```shell
npm install --save ueq-element
```
or `yarn`:
```shell
yarn add ueq-element
```
and include it from your `node_modules`:
```html
...
<head>
    <script type="module" src="node_modules/ueq-element/lib/ueq-element.esm.js"></script>
</head>
...
```

## Usage
The `ueq-element` is a [form-associated](https://html.spec.whatwg.org/multipage/custom-elements.html#form-associated-custom-element) element,
which means it can be used as any other form element inside a HTML form:
```html
<body>
    <form>
        <ueq-element name="form-element-name"></ueq-element>
    </form>
</body>
```
### Value retrieval
The `ueq-element` supports value retrieval in "classic" HTML way or via direct Javascript access.
#### HTML form access
On standard usage with submitting the HTML form, the data is sent in the array format, indiced by the row __number__, _not_ the index.
```
name[1] = '5'
name[2] = '5'
name[3] = '5'
...
```
The [attribute `named-values`](#Attributes) configures the element to aubmit values as a map instead of an array in the form:
```
name[enjoyableness] = '5'
name[understandability] = '5'
name[creativity] = '5'
...
```

#### JavaScript value access
If you are using the element with javascript access, the `ueq-element` provides 2 getters for accessing values in different formats:
```javascript
const el = document.querySelector('ueq-element');
const valueAsObject = el.values; // Returns values as JS object
const valueAsForm = el.formData; // Returns values as FormData
```

## Configuration
### Attributes
As the `ueq-element` is , the general attributes for [form elements](https://html.spec.whatwg.org/multipage/forms.html#categories) are allowed by default.
In addition, a set of specialized, optional attributes are available:

| Attribute      | Type   | Default | Description |
| -------------  | ------ | ------- | ----------- |
| `type`         | string | `Full`  | Select type uf the UEQ scale to be used. Valid values are `Full`, `Short`, and `Plus` (not implemented) |
| `named-values` | bool   | false   | Submits the selected values as map instead of array |

### Language configuration
The [UEQ](https://www.ueq-online.org/) comes with a lot of translations in different languages.
Those will be applied according to the language set in the [HTML context](https://www.w3.org/TR/REC-html40/struct/dirlang.html#h-8.1.2).
This means, setting of the `lang` attribute of a parent overrides the language.

You can set the language directly via `lang`-attribute of the element itself:
```html
<ueq-element lang="de"></ueq-element>
```

Alternatively, you can have HTML infer the rule from the parent:
```html
<body lang="en">
    <form lang="fr">
        <ueq-element></ueq-element>
        <!-- Language of the UEQ will be french -->
    </form>
</body>
```

### Available languages
Semantically, all [valid language codes](https://www.ietf.org/rfc/rfc1766.txt) are accepted.
This means, if available, also secondary languages may be applicable (like `en-UK` or `en-US`) if available.
If a secondary language is chosen, that does not exist (e.g. `en-XYZ`), the default secondary language is automatically
chosen for the specified primary language.
If no default language is set or the primary language is not set, primary language `en` with secondary `us` is set.


# License
This has been released under [MIT license](LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FdaHaimi%2Fueq-element.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FdaHaimi%2Fueq-element?ref=badge_large)
