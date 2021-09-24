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
