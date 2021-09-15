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
        de: await import('./de-DE.json'),
        // @ts-ignore
        default: this.de
    },
    en: {
        us: await import('./en-US.json'),
        // @ts-ignore
        default: this.us
    },
};

export {
    i18n
};
