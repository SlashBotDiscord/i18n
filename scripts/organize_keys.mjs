import { opendir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BLACKLISTED = ["AVAILABLE_LANGUAGES.json"];
const BASE_PATH = join(process.cwd(), "resources");

const PRIMARY_FILE = await pathToJSON(join(BASE_PATH, "en.json"));

for await (const dirent of await opendir(BASE_PATH)) {
    if (!dirent.isFile() || BLACKLISTED.includes(dirent.name)) continue;
    const filepath = join(BASE_PATH, dirent.name);
    const file = await pathToJSON(filepath);

    for (const k in file) {
        if (!(k in PRIMARY_FILE)) {
            console.warn(
                `Removing extra key from resources/${dirent.name} — "${k}": "${file[k]}"`
            );

            delete file[k];
        }
    }

    for (const k in PRIMARY_FILE) {
        if (!(k in file)) {
            file[k] = "";
            console.info(
                `Adding missing key "${k}" in resources/${dirent.name}`
            );
        }
    }

    await writeFile(
        filepath,
        JSON.stringify(
            Object.fromEntries(
                Object.entries(file).sort((a, b) => a[0].localeCompare(b[0]))
            ),
            null,
            4
        )
    );
}

/**
 * @param {string} path
 * @returns {Promise<Record<string, string>>}
 */
async function pathToJSON(path) {
    try {
        return JSON.parse(await readFile(path, { encoding: "utf-8" }));
    } catch (err) {
        console.error(`Failed to parse '${path}':`, err);
        process.exit(1);
    }
}
