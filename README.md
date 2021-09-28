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
If this is not visible, please visit the [live example on webcomponents.org](https://www.webcomponents.org/element/ueq-element).
<!--
```
<custom-element-demo>
  <template>
    <script type="module" src="https://cdn.jsdelivr.net/npm/ueq-element/lib/ueq-element.esm.js"></script>
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
If the `required` attribute of the `ueq-element` is not set, only the values for items which have been selected are set.
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

<table>
    <thead>
        <tr><th>Language</th><th>Localization</th></tr>
    </thead>
    <tbody id="i18n"><tr>
        <td>Arabic</td>
        <td><img src="https://img.shields.io/badge/lang-ar_AR-brightgreen" alt="ar-AR" /></td>
    </tr>
<tr>
        <td>Bulgarian</td>
        <td><img src="https://img.shields.io/badge/lang-bg_BG-brightgreen" alt="bg-BG" /></td>
    </tr>
<tr>
        <td>Bengali</td>
        <td><img src="https://img.shields.io/badge/lang-bn_BN-brightgreen" alt="bn-BN" /></td>
    </tr>
<tr>
        <td>Bosnian</td>
        <td><img src="https://img.shields.io/badge/lang-bs_BS-brightgreen" alt="bs-BS" /></td>
    </tr>
<tr>
        <td>Czech</td>
        <td><img src="https://img.shields.io/badge/lang-cs_CS-brightgreen" alt="cs-CS" /></td>
    </tr>
<tr>
        <td>Danish</td>
        <td><img src="https://img.shields.io/badge/lang-da_DA-brightgreen" alt="da-DA" /></td>
    </tr>
<tr>
        <td>German</td>
        <td><img src="https://img.shields.io/badge/lang-de_DE-brightgreen" alt="de-DE" /></td>
    </tr>
<tr>
        <td>Greek</td>
        <td><img src="https://img.shields.io/badge/lang-el_EL-brightgreen" alt="el-EL" /></td>
    </tr>
<tr>
        <td>English</td>
        <td><img src="https://img.shields.io/badge/lang-en_US-brightgreen" alt="en-US" /></td>
    </tr>
<tr>
        <td>Spanish</td>
        <td><img src="https://img.shields.io/badge/lang-es_ES-brightgreen" alt="es-ES" /></td>
    </tr>
<tr>
        <td>Estonian</td>
        <td><img src="https://img.shields.io/badge/lang-et_ET-brightgreen" alt="et-ET" /></td>
    </tr>
<tr>
        <td>Persian</td>
        <td><img src="https://img.shields.io/badge/lang-fa_FA-brightgreen" alt="fa-FA" /></td>
    </tr>
<tr>
        <td>Finnish</td>
        <td><img src="https://img.shields.io/badge/lang-fi_FI-brightgreen" alt="fi-FI" /></td>
    </tr>
<tr>
        <td>French</td>
        <td><img src="https://img.shields.io/badge/lang-fr_FR-brightgreen" alt="fr-FR" /></td>
    </tr>
<tr>
        <td>Hebrew</td>
        <td><img src="https://img.shields.io/badge/lang-he_HE-brightgreen" alt="he-HE" /></td>
    </tr>
<tr>
        <td>Hindi</td>
        <td><img src="https://img.shields.io/badge/lang-hi_HI-brightgreen" alt="hi-HI" /></td>
    </tr>
<tr>
        <td>Croatian</td>
        <td><img src="https://img.shields.io/badge/lang-hr_HR-brightgreen" alt="hr-HR" /></td>
    </tr>
<tr>
        <td>Hungarian</td>
        <td><img src="https://img.shields.io/badge/lang-hu_HU-brightgreen" alt="hu-HU" /></td>
    </tr>
<tr>
        <td>Indonesian</td>
        <td><img src="https://img.shields.io/badge/lang-id_ID-brightgreen" alt="id-ID" /></td>
    </tr>
<tr>
        <td>Italian</td>
        <td><img src="https://img.shields.io/badge/lang-it_IT-brightgreen" alt="it-IT" /></td>
    </tr>
<tr>
        <td>Japanese</td>
        <td><img src="https://img.shields.io/badge/lang-ja_JA-brightgreen" alt="ja-JA" /></td>
    </tr>
<tr>
        <td>Kannada</td>
        <td><img src="https://img.shields.io/badge/lang-kn_KN-brightgreen" alt="kn-KN" /></td>
    </tr>
<tr>
        <td>Marathi</td>
        <td><img src="https://img.shields.io/badge/lang-mr_MR-brightgreen" alt="mr-MR" /></td>
    </tr>
<tr>
        <td>Malay</td>
        <td><img src="https://img.shields.io/badge/lang-ms_MS-brightgreen" alt="ms-MS" /></td>
    </tr>
<tr>
        <td>Dutch</td>
        <td><img src="https://img.shields.io/badge/lang-nl_NL-brightgreen" alt="nl-NL" /></td>
    </tr>
<tr>
        <td>Norwegian</td>
        <td><img src="https://img.shields.io/badge/lang-no_NO-brightgreen" alt="no-NO" /></td>
    </tr>
<tr>
        <td>Polish</td>
        <td><img src="https://img.shields.io/badge/lang-pl_PL-brightgreen" alt="pl-PL" /></td>
    </tr>
<tr>
        <td>Portuguese</td>
        <td><img src="https://img.shields.io/badge/lang-pt_PT-brightgreen" alt="pt-PT" /></td>
    </tr>
<tr>
        <td>Russian</td>
        <td><img src="https://img.shields.io/badge/lang-ru_RU-brightgreen" alt="ru-RU" /></td>
    </tr>
<tr>
        <td>Slovak</td>
        <td><img src="https://img.shields.io/badge/lang-sk_SK-brightgreen" alt="sk-SK" /></td>
    </tr>
<tr>
        <td>Slovene</td>
        <td><img src="https://img.shields.io/badge/lang-sl_SL-brightgreen" alt="sl-SL" /></td>
    </tr>
<tr>
        <td>Swedish</td>
        <td><img src="https://img.shields.io/badge/lang-sv_SV-brightgreen" alt="sv-SV" /></td>
    </tr>
<tr>
        <td>Tamil</td>
        <td><img src="https://img.shields.io/badge/lang-ta_TA-brightgreen" alt="ta-TA" /></td>
    </tr>
<tr>
        <td>Thai</td>
        <td><img src="https://img.shields.io/badge/lang-th_TH-brightgreen" alt="th-TH" /></td>
    </tr>
<tr>
        <td>Turkish</td>
        <td><img src="https://img.shields.io/badge/lang-tr_TR-brightgreen" alt="tr-TR" /></td>
    </tr>
<tr>
        <td>Chinese</td>
        <td><img src="https://img.shields.io/badge/lang-zh_ZH-brightgreen" alt="zh-ZH" /></td>
    </tr></tbody>
</table>

If you are missing a specific language or would like to provide a new translation, please reach out to the
[UEQ Team](https://www.ueq-online.org/).


# License
This has been released under [MIT license](LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FdaHaimi%2Fueq-element.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FdaHaimi%2Fueq-element?ref=badge_large)
