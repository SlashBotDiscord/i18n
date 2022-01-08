const fs = require("fs")

const en = JSON.parse(fs.readFileSync('./en.json'));
let template = {};

for (let k in en) template[k] = "";
template = JSON.stringify(template);
let missing_values = []

for (const file of fs.readdirSync('.')) {
    if ((file.length != 7 || file.endsWith("js")) && file !== "TEMPLATE.json") continue

    const json = JSON.parse(fs.readFileSync('./' + file))
    const o = JSON.parse(template)

    /*let sorted = Object.keys(json).sort((a, b) => {
        if(a.includes("_") && b.includes("_")) return a.localeCompare(b)
        else if (a.includes("_") && !b.includes("_")) return 1
        else if (!a.includes("_") && b.includes("_")) return -1
        else if (!a.includes("_") && !b.includes("_")) return a.length > b.length ? -1 : 1
        else return 0
    })*/

    for (let k in json) {
        o[k] = json[k];
        let keys_en = /{(\d+)}/g.exec(en[k])
        if(keys_en && json[k]) {
           if(keys_en.length !== /{(\d+)}/g.exec(json[k])?.length) missing_values.push(k) 
        }
    }

    fs.writeFileSync('./' + file, JSON.stringify(o, null, 4))
}

console.log(missing_values)