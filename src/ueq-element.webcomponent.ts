import 'element-internals-polyfill/dist'
import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ElementInternals} from "element-internals-polyfill/dist/element-internals";
import {i18n, TranslateFunc, Translation} from './assets/i18n';
import {UeqContents, UeqEmotionType, UeqModality} from "./ueq.contents";
import style from './styles.scss';
import {PropertyValues} from "@lit/reactive-element";
import {ValidityState} from "element-internals-polyfill/dist/ValidityState";

/**
 * The User Experience Questionnaire (UEQ) {@link https://www.ueq-online.org/} as WebComponent.
 * Configurable to also suit the requirements for UEQ-S and UEQ+ {@link http://ueqplus.ueq-research.org/}
 */
@customElement('ueq-element')
export class UeqElementWebcomponent extends LitElement {
    private static DEFAULT_LANG = 'en';

    private internals!: ElementInternals;
    private _required = false;
    private readonly valueIndexMap = new Map<number, number>();
    private secondaryLang = 'default';
    private trans!: Translation

    @property({
        type: UeqEmotionType,
        converter: {
            fromAttribute(value: string | null): UeqEmotionType {
                return `${value?.substr(0, 1).toUpperCase()}${value?.substr(1).toLowerCase()}` as UeqEmotionType;
            },
            toAttribute(value: UeqEmotionType): string {
                return value.toLowerCase();
            }
        }
    }) type = UeqEmotionType.Full;
    @property() name!: string;
    @property({type: Boolean, attribute: 'named-values'}) namedValues = false;

    @property()
    get required(): boolean {
        return this._required;
    }
    set required(isRequired: unknown) {
        if (typeof isRequired === 'string' && isRequired !== 'false') {
            isRequired = true;
        }
        const old = this._required;
        this._required = isRequired as boolean;
        this.internals.ariaRequired = `${isRequired}`;
        this.requestUpdate('required', old);
    }

    constructor() {
        super();
        if (this.attachInternals != undefined) {
            this.internals = this.attachInternals();
        }
        this.findLanguage();
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        this.validateInternals();
    }

    static get formAssociated() { return true; }
    get form(): HTMLFormElement { return this.internals.form; }
    get validity(): ValidityState { return this.internals.validity; }
    get validationMessage(): string { return this.internals.validationMessage; }
    get willValidate(): boolean { return this.internals.willValidate; }
    reportValidity(): boolean { return this.internals.reportValidity(); }
    get object(): object {
        const result: { [key: string]: number } = {};
        this.valueIndexMap.forEach((e, k) => result[this.namedValues ? UeqContents[this.type][k].name : k + 1] = e + 1);
        return result;
    }
    get formData(): FormData {
        const result = new FormData();
        this.valueIndexMap.forEach((e, k) =>
            result.set(`${this.name}[${this.namedValues ? UeqContents[this.type][k].name : k + 1}]`, `${e}`)
        );
        return result;
    }
    get translation(): Translation {
        return this.trans;
    }

    /**
     * Render a single row (modality) with translated extrema and event-bound selections
     * @param mod {@type UeqItem} the modality object
     * @param idx {@type number} the modality's index
     * @private
     */
    private renderModality(mod: UeqModality, idx: number) {
        const contents = new Array(7).fill(0).map((_,i) =>
            html`<input type="radio" name="${mod.name}" value="${i + 1}" @change="${this.onChange.bind(this, idx, i)}" />`
        );
        return html`<div class="row">
            <span class="minimum">${this._t(mod.low)}</span>
            <span class="selections">${contents}</span>
            <span class="maximum">${this._t(mod.high)}</span>
        </div>`;
    }

    /**
     * The internally called render method to create the content of the shadowRoot
     */
    render() {
        return html`${UeqContents[this.type].map((i, idx) => this.renderModality(i, idx))}`;
    }

    /**
     * The internally called styles getter to render the shadowRoot CSS
     */
    static styles = style({ css });

    /**
     * Listener for selecting a single item
     * @param rowIdx {@type number} the index of the selected item's modality
     * @param itemIdx {@type number} the index of the selected item
     * @private
     */
    private onChange(rowIdx: number, itemIdx: number) {
        this.valueIndexMap.set(rowIdx, itemIdx);
        this.internals.setFormValue(this.formData);
        this.validateInternals();
    }

    /**
     * Validate the current input state according to the configuration
     * @private
     */
    private validateInternals(): void {
        if (this.required) {
            const firstElement = this.shadowRoot?.querySelector('input') as HTMLInputElement;
            // No element selected
            if (this.valueIndexMap.size === 0) {
                return this.internals.setValidity({
                    valueMissing: true
                }, this._t('This field is required.'), firstElement);
            }
            if (this.valueIndexMap.size !== UeqContents[this.type].length) {
                return this.internals.setValidity({
                    tooShort: true,
                    valueMissing: true
                }, this._t('All fields must be filled out.'), firstElement);
            }
        }
        this.internals.setValidity({});
    }

    /**
     * Finds closest element defining a language with universal attribute lang and sets the element's attribute to it.
     * @see {@link https://www.w3.org/TR/REC-html40/struct/dirlang.html#h-8.1.2}
     * The languages are split by their definition in RFC 1766.
     * @see {@link https://www.ietf.org/rfc/rfc1766.txt}
     * If no secondary language is provided, the primary language's default is used if present.
     * If no default language is found or no translation for the primary language exists, english us (default) is used.
     * @private
     */
    private findLanguage() {
        // Get closest lang
        this.lang = this.closest('[lang]')?.getAttribute('lang') || UeqElementWebcomponent.DEFAULT_LANG;
        // Split language if not unique
        if (this.lang.length != 2) {
            // Filter out IANA defined primary languages
            const lang = this.lang.match(/^([ix]|[a-z]{2})[_-](.*)$/i);
            if (lang) {
                this.lang = lang[1].toLowerCase();
                this.secondaryLang = lang[2].toLowerCase();
            } else {
                this.lang = UeqElementWebcomponent.DEFAULT_LANG;
            }
        }
        this.trans = this.resolveLanguage();
    }

    /**
     * Resolve primary & secondary language and select most appropriate translation
     * @private
     */
    private resolveLanguage(): Translation {
        if (i18n.hasOwnProperty(this.lang)) {
            // Primary Language exists; select secondary
            if (i18n[this.lang].hasOwnProperty(this.secondaryLang)) {
                return i18n[this.lang][this.secondaryLang];
            }
            // if secondary does not, select default
            if (i18n[this.lang].hasOwnProperty('default')) {
                return i18n[this.lang].default;
            }
        }
        return i18n[UeqElementWebcomponent.DEFAULT_LANG].default;
    }

    /**
     * Translates a string into a string for the selected language
     * Optionally accepts additional parameters for string formatting
     * @param key {string} The translation key
     * @param params {string[]} [Optional] formatting parameters
     * @private
     */
    private _t(key: string, ...params: string[]): string {
        if (this.trans.translations.hasOwnProperty(key)) {
            if (typeof this.trans.translations[key] === 'string') {
                return this.trans.translations[key] as string;
            }
            return (this.trans.translations[key] as TranslateFunc)(...params);
        }
        return `%${key}%`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ueq-element': UeqElementWebcomponent;
    }
}

// Reexport i18n
export { i18n };
