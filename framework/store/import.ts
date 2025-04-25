import { join } from "node:path";

export const importWithHotReload = async (
    specifier: string,
    onUpdate?: (mod: any) => void,
) => {
    const path = join("file://..", "..", specifier);
    const mod = await import(path);
    import.meta.hot?.accept(path, async () => {
        onUpdate?.(await import(path));
    });
    return mod;
};
