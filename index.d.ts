export declare enum Locale {
    Indonesian = "id",
    EnglishUS = "en-US",
    EnglishGB = "en-GB",
    Bulgarian = "bg",
    ChineseCN = "zh-CN",
    ChineseTW = "zh-TW",
    Croatian = "hr",
    Czech = "cs",
    Danish = "da",
    Dutch = "nl",
    Finnish = "fi",
    French = "fr",
    German = "de",
    Greek = "el",
    Hindi = "hi",
    Hungarian = "hu",
    Italian = "it",
    Japanese = "ja",
    Korean = "ko",
    Lithuanian = "lt",
    Norwegian = "no",
    Polish = "pl",
    PortugueseBR = "pt-BR",
    Romanian = "ro",
    Russian = "ru",
    SpanishES = "es-ES",
    LatAmES = "es-419",
    Swedish = "sv-SE",
    Thai = "th",
    Turkish = "tr",
    Ukrainian = "uk",
    Vietnamese = "vi"
}

export declare type LocaleString = `${Locale}`;

export declare class SlashBotLocalizationManager {
    constructor()
    loadLanguages(): undefined;
    getTranslation(locale: LocaleString, key: string, ...args: (string | number)[]): string;
    getAvailableLanguages(): {name: string, translatedPercent: number}[];
}