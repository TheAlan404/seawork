import { cache } from "#core/cache/index.ts";
import { store } from "../store/store";
import { typegenCommand, typegenHeader } from "./typegen";

store.on("commandUpdate", () => {
    devTypeGen();
});

store.on("loadedCommands", () => {
    devTypeGen();
});

export const devTypeGen = () => {
    cache.writeTypes(createTypesDts());
    console.log(`Types generated for ${store.commands.size} commands`);
};

const createTypesDts = () => {
    return [
        typegenHeader(),
        ...store.commands.values().map(typegenCommand),
        "",
    ].join("\n\n");
};

import.meta.hot?.accept();
