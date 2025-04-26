import { cache } from "#core/cache/index.ts";
import config from "../../../config";
import { store } from "../store/store";
import { createCommandsJSON } from "./generate";
import { isDeepStrictEqual } from "node:util";
import { publishCommands } from "./publish";

store.on("commandUpdate", () => {
    devPublishCommands();
});

export const devPublishCommands = async () => {
    if(!config.guildId) return;
    const cached = cache.data.commands.guilds[config.guildId];

    const current = createCommandsJSON();
    if(!current.length) return; // In case commands aren't loaded already

    if(isDeepStrictEqual(cached?.body, current)) {
        console.log("[publish] Commands not changed");
        return;
    };

    try {
        cache.data.commands.guilds[config.guildId] = {
            body: current,
        };
        cache.writeCache();

        await publishCommands(current, config.guildId);
        console.log("[publish] Commands published!");
    } catch(e) {
        console.log("[publish] Publishing error", e);
    }
};

import.meta.hot?.accept();
