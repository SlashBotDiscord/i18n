# SlashBot Localization

This repository contains the translations of [SlashBot](https://top.gg/bot/788814313930096662).
You can invite the bot [here](https://discord.com/api/oauth2/authorize?client_id=788814313930096662&permissions=8&scope=bot%20applications.commands).

## Available Languages

Thanks to our contributors, we have translated the bot to the following languages ❤

- English ([`Zelda_Fan#0225`](https://github.com/ZeldaFan0225))
- German ([`Zelda_Fan#0225`](https://github.com/ZeldaFan0225))
- Spanish (`Evil Psychiatric ↯#6666`)
- Portuguese (`Fabricio#3801`)
- Czech ([`Dejvy#0069`](https://github.com/Dejvy))
- French ([`ARγOtaRe#8215`](https://github.com/ARyOtaRe), [`Pikachu#0003`](https://github.com/PikaFederation))

## FAQs

### I want to translate the bot to a different language

Sure you can! Follow the following steps to translate the bot!

1. Make sure there isn't a pull request for your language. In that case, you can verify their translations or ask the contributor to work together.
2. [Fork this repository](https://github.com/SlashBotDiscord/SlashBotLocalization/fork).
3. Rename this `/resources/en.json` file to `/resources/language_key.json` where `language_key` is a locale [supported by Discord](https://discord.com/developers/docs/dispatch/field-values#predefined-field-values-accepted-locales).
4. Translate the `/resources/language_key.json` file. Only the values! Not the keys. In case your translation contains double-quotes, escape them with a bashslash (i.e. `"` => `\"`). Do not touch argument variables such as `{0}`.
5. Create a pull request with the new language.
6. Wait for approval.

### How to modify or improve an already existing language?

Follow the steps `2` and `4-6` of the [above question](https://github.com/SlashBotDiscord/SlashBotLocalization#i-want-to-translate-the-bot-to-a-different-language).

### I have a question. Where should I ask?

You can create [a new issue](https://github.com/SlashBotDiscord/SlashBotLocalization/issues/new?labels=question) or [join our support server](https://discord.gg/hJGetcxCSy).
