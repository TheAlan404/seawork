import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extname, join, sep, basename } from "node:path";

export const splitSegments = (path: string) => path.split(sep);

export const isModuleFile = (path: string) => [
    ".tsx",
    ".jsx",
    ".ts",
    ".js",
].includes(extname(path));

export const removeExt = (path: string) => {
    return path.slice(0, path.length - extname(path).length);
};

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


