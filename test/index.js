const { SlashBotLocalizationManager } = require( "../index" );

const languages = new SlashBotLocalizationManager()
console.log(languages.getTranslation("de", "NONE"))
languages.loadLanguages()
console.log(languages.getTranslation("en-US", "NONE"))