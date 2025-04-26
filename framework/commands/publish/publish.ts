import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import config from "../../../config";

export const publishCommands = async (
    rest: REST,
    body: RESTPostAPIChatInputApplicationCommandsJSONBody[],
    guildId?: string,
) => {
    try {
        const appId = config.clientId;
        if(!appId) throw new Error("Application ID could not be resolved");
        const route = guildId ? (
            Routes.applicationGuildCommands(appId, guildId)
        ) : (
            Routes.applicationCommands(appId)
        );
        await rest.put(route, {
            body,
        });
    } catch(e) {
        console.log("Error while publishing commands", e);
    }
}
