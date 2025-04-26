import { client } from "#core/client.ts";
import { RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import config from "../../../config";

export const publishCommands = async (
    body: RESTPostAPIChatInputApplicationCommandsJSONBody[],
    guildId?: string,
) => {
    try {
        const appId = client.application?.id || config.clientId;
        if(!appId) throw new Error("Application ID could not be resolved");
        const route = guildId ? (
            Routes.applicationGuildCommands(appId, guildId)
        ) : (
            Routes.applicationCommands(appId)
        );
        await client.rest.put(route, {
            body,
        });
    } catch(e) {
        console.log("Error while publishing commands", e);
    }
}
