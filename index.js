const {readdirSync, readFileSync} = require("fs")

class SlashBotLocalizationManager {
    #languages = {}
    #availableLanguages = []
    constructor() {
        this.loadLanguages()
    }

    get languages() {
        return this.#languages
    }

    loadLanguages() {
        let i18n = {};
        readdirSync(`${__dirname}/localizations`)
            .forEach((f) => {
                i18n[f.replace(".json", "")] = JSON.parse(
                    readFileSync(`${__dirname}/localizations/${f}`).toString("utf-8")
                );
            });
        this.language
        this.#languages = i18n
        this.#availableLanguages = []
    }

    getTranslation(locale, key, ...args) {
		let language = locale
		// language = language.split("-")[0]
		if (!(language in this.languages)) language = "en-US";

		const strings = this.languages[language],
			english = this.languages["en-US"];
		let value;

		if (key in strings) value = strings[key];
		if (!value && key in english) value = english[key];
		if (!value) throw new Error("Unknown key " + key);

        return value.replace(/{(\d+)}/g, (_, i) => args[i]?.toString() ?? _);
    }

    getAvailableLanguages() {
        if(this.#availableLanguages.length) return this.#availableLanguages
        const enKeys = Object.keys(this.languages["en-US"]).length;
        const availableLanguages = JSON.parse(
            readFileSync(`${__dirname}/information/AVAILABLE_LANGUAGES.json`, "utf-8")
        );
        /*if(!availableLanguages.length) {
            availableLanguages.push(...Object.keys(this.languages))
        }*/
        this.#availableLanguages = availableLanguages.map(lang => {
            return {
                name: lang.replace(/_/g, "-").toLowerCase(),
                translatedPercent: Object.values(this.languages[lang] || {}).filter(v => v).length / enKeys,
            }
        }).sort((a, b) => b.translatedPercent - a.translatedPercent);
        return this.#availableLanguages
    }
}

module.exports = {SlashBotLocalizationManager}