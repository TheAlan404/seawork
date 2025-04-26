import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { CacheRoot, createCacheRoot } from "./types";

export class DotCacheManager {
    rootPath = ".seawork";
    dataPath = join(this.rootPath, "cache.json");
    typesPath = join(this.rootPath, "types.d.ts");

    data: CacheRoot;
    constructor() {
        if(!existsSync(this.rootPath)) mkdirSync(this.rootPath);

        if(existsSync(this.dataPath)) {
            try {
                this.data = JSON.parse(readFileSync(this.dataPath).toString());
            } catch(e) {
                console.log("Failed to load .seawork/cache.json");
                this.data = createCacheRoot();
            }
        } else {
            this.data = createCacheRoot();
        };
    }

    writeCache() {
        writeFileSync(this.dataPath, JSON.stringify(this.data));
    }

    writeTypes(types: string) {
        writeFileSync(this.typesPath, types);
    }
};

export const cache = new DotCacheManager();

