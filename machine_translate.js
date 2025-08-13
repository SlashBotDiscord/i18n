// Import required modules
const fs = require('fs');
const path = require('path');

// Parse .env file manually
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
for (const line of fs.readFileSync(`${process.cwd()}/.env`, 'utf8').split(/[\r\n]/)) {
    const [, key, value] = line.match(RE_INI_KEY_VAL) || [];
    if (!key) continue;

    process.env[key] = value?.trim();
}

const apiKey = process.env.API_TOKEN;
const completionUrl = process.env.COMPLETION_URL || 'https://api.openai.com/v1';
const model = process.env.MODEL || 'text-davinci-003';

// Get target language from command-line arguments
const targetLanguage = process.argv[2];
if (!targetLanguage) {
    console.error('Please provide a target language as an argument.');
    process.exit(1);
}

const systemInstruction = `You are a translation tool translating to ${targetLanguage}.
The texts you are asked to translate are from a discord bot and might not make sense out of context.
Translate special discord related words properly. Do not add or remove any special characters.
Keep the placeholders where they make sense and the upper/lowercase formatting at the beginning intact.
Use the personal form if possible. Don't overcomplicate translations, keep them as short as the originals.
Keep grammar in tact so the translations sound right.`;

// Execute translation
translateFile(targetLanguage).catch(err => console.error('Error:', err));

// Function to translate text using OpenAI API
async function translateText(text, targetLanguage, referenceText) {
    const prompt = `Translate the texts to ${targetLanguage}\nEnglish Text:\n${text}\n\nGerman text:\n${referenceText}`;

    const response = await fetch(completionUrl + "/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: prompt }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// Main function to handle translation
async function translateFile(targetLanguage) {
    const sourceFilePath = path.join(__dirname, 'localizations/en-US.json');
    const referenceFilePath = path.join(__dirname, 'localizations/de.json');
    const targetFilePath = path.join(__dirname, `localizations/${targetLanguage}.json`);

    const sourceContent = fs.readFileSync(sourceFilePath, 'utf-8');
    const sourceData = JSON.parse(sourceContent);

    let referenceData = {};
    if (fs.existsSync(referenceFilePath)) {
        const referenceContent = fs.readFileSync(referenceFilePath, 'utf-8');
        referenceData = JSON.parse(referenceContent);
    }

    let targetData = {};
    if (fs.existsSync(targetFilePath)) {
        const targetContent = fs.readFileSync(targetFilePath, 'utf-8');
        targetData = JSON.parse(targetContent);
    }

    const translatedData = { ...targetData };

    for (const key in sourceData) {
        if (!targetData[key]) {
            console.log(`Translating key: ${key}`);
            const translatedText = await translateText(sourceData[key], targetLanguage, referenceData[key]);
            translatedData[key] = translatedText;

            fs.writeFileSync(targetFilePath, JSON.stringify(translatedData, null, 4), 'utf-8');
        }
    }
}
