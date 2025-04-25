import { join } from "node:path";

export const importWithHotReload = async (specifier: string) => {
    const path = join("file://..", "..", specifier);
    const mod = await import(path);
    import.meta.hot?.accept(path);
    return mod;
};
