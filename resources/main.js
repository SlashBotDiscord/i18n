const fs = require("fs")

const en = JSON.parse(fs.readFileSync('./en.json'));
let template = {};

for (let k in en) template[k] = "";
template = JSON.stringify(template);

for (const file of fs.readdirSync('.')) {
    if ((file.length != 7 || file.endsWith("js")) && file !== "TEMPLATE.json") continue

    const json = JSON.parse(fs.readFileSync('./' + file))
    const o = JSON.parse(template)

    for (let k in json) {
        o[k] = json[k]
    }

    fs.writeFileSync('./' + file, JSON.stringify(o, null, 4))
}