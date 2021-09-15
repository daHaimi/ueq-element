import 'element-internals-polyfill/dist'
import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ElementInternals} from "element-internals-polyfill/dist/element-internals";
import {i18n, TranslateFunc, Translation} from './assets/i18n';
import {UeqContents, UeqEmotionType, UeqItem} from "./ueq.contents";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('ueq-element')
export class UeqElementWebcomponent extends LitElement {
    private DEFAULT_LANG = 'en';


    private _internals!: ElementInternals;
    private _required = false;
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
    }) type = UeqEmotionType.Short;
    @property() name!: string;

    @property()
    get required() {
        return this._required;
    }
    set required(isRequired: boolean) {
        const old = this._required;
        this._required = isRequired;
        this._internals.ariaRequired = `${isRequired}`;
        this.requestUpdate('required', old);
    }

    constructor() {
        super();
        if (this.attachInternals != undefined) {
            this._internals = this.attachInternals();
        }
        this.findLanguage();
    }

    static get formAssociated() {
        return true;
    }

    static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

    /**
     * The number of times the button has been clicked.
     */
    @property({type: Number})
    count = 0;

    private renderItem(item: UeqItem) {
        const contents = "1234567";
        return `<span @click="${this._onClick}" class="minimum">${this._t(item.low)}</span>
        ${contents}
        <span class="maximum">${this._t(item.high)}</span>`;
    }

    private renderRows() {
        return UeqContents[this.type].map(i => this.renderItem(i)).join();
    }

    render() {
        return html`
      <div class="content">
        ${this.renderRows()}
      </div>
    `;
    }

    private _onClick(evt: unknown) {
        console.log(evt);
        this.count++;
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
        this.lang = this.closest('[lang]')?.getAttribute('lang') || this.DEFAULT_LANG;
        // Split language if not unique
        if (this.lang.length != 2) {
            // Filter out IANA defined primary languages
            const lang = this.lang.match(/^[ix]-(.*)$/i);
            if (lang) {
                this.secondaryLang = lang[1].toLowerCase();
            } else {
                this.lang = this.DEFAULT_LANG;
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
        return i18n[this.DEFAULT_LANG].default;
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
