const { SlashBotLocalizationManager } = require( "../index" );

const languages = new SlashBotLocalizationManager()
console.log(languages.getTranslation("de", "NONE"))