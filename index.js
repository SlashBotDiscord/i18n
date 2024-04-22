const {readdirSync, readFileSync} = require("fs")

class SlashBotLocalizationManager {
    #languages = {}
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
}

module.exports = {SlashBotLocalizationManager}