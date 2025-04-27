import { ApplicationCommandType, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { store } from "../store/store";

// TODO: serialize cmd.options
// TODO: subcommands + subcommand groups

export const createCommandsJSON = () => {
    let json: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    
    for(let command of store.commands.values()) {
        let parent = json;
        for(let segment of command.path) {}

        let data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
            type: ApplicationCommandType.ChatInput,
            name: command.path[command.path.length - 1],
            description: command.path[command.path.length - 1],
            options: [],
        };

        parent.push(data);
    }

    return json;
};



