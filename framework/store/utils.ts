import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

export const traverseAllFiles = (root: string) => {
    let files: string[] = [];
    for(let entry of readdirSync(root, { withFileTypes: true })) {
        let path = join(root, entry.name);
        if(entry.isDirectory()) {
            files.push(...traverseAllFiles(path));
        } else {
            files.push(path);
        }
    }
    return files;
};

export const importWithHotReload = async (specifier: string) => {
    const mod = await import(specifier);
    import.meta.hot?.accept(specifier);
    return mod;
};
