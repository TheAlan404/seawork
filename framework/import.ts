export const hmrImport = async (
    url: string,
    onUpdate?: (mod: any) => void,
) => {
    const path = import.meta.resolve("../" + url);

    import.meta.hot?.accept(path, async () => {
        onUpdate?.(await import(path));
    });

    onUpdate?.(await import(path));
};
