import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export const createCacheRoot = (): CacheRoot => {
    return {
        commands: {
            guilds: {},
            global: {
                body: []
            },
        },
    };
};

export type CacheRoot = {
    commands: CacheCommands;
};

export type CacheCommands = {
    global: CacheCommandsContainer;
    guilds: Record<string, CacheCommandsContainer>;
};

export type CacheCommandsContainer = {
    body: RESTPostAPIApplicationCommandsJSONBody[];
};
