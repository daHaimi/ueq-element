import * as de_DE from './de-DE.json';
import * as en_US from './en-US.json';

export type TranslateFunc = (...params: string[]) => string;

export type Translation = {
    code: string,
    description?: string,
    translations: {
        [key: string]: string | TranslateFunc,
    }
};

export type Languages = {
    [key: string]: {
        [key: string]: Translation,
        default: Translation
    }
}

const i18n: Languages = {
    de: {
        de: de_DE,
        // @ts-ignore
        default: de_DE
    },
    en: {
        us: en_US,
        // @ts-ignore
        default: en_US
    },
};

export {
    i18n
};
