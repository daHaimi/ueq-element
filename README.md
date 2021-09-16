# ueq-element
A WebComponent to support a configurable User Experience Questionnaire


## Language configuration
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
