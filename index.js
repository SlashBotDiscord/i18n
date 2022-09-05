class SlashBotLocalizationManager {
    constructor() {
        this.loadLanguages()
    }

    loadLanguages() {
        let i18n = {};
        readdirSync("./localizations")
            .filter((f) => f.replace(".json", "").length === 2)
            .forEach((f) => {
                i18n[f.replace(".json", "")] = JSON.parse(
                    readFileSync(`./localizations/${f}`).toString("utf-8")
                );
            });
        Object.defineProperty(this, "languages", {value: i18n})
    }

    getTranslation(locale, key, ...args) {
		let language = locale
		language = language.split("-")[0]
		if (!(language in this.client.i18n)) language = "en";

		const strings = this.client.i18n[language],
			english = this.client.i18n["en"];
		let value;

		if (key in strings) value = strings[key];
		if (!value && key in english) value = english[key];
		if (!value) throw new Error("Unknown key " + key);

        return value.replace(/{(\d+)}/g, (_, i) => args[i]?.toString() ?? _);
    }
}

module.exports = {SlashBotLocalizationManager}