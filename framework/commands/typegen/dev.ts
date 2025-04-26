import { cache } from "#core/cache/index.ts";
import { store } from "../store/store";
import { typegenCommand, typegenHeader } from "./typegen";

store.on("commandUpdate", () => {
    devTypeGen();
});

export const devTypeGen = () => {
    cache.writeTypes(createTypesDts());
};

const createTypesDts = () => {
    return [
        typegenHeader(),
        ...store.commands.values().map(typegenCommand),
        "",
    ].join("\n\n");
};

import.meta.hot?.accept();
