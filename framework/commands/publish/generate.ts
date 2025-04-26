import { ApplicationCommandType, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { store } from "../store/store";

export const createCommandsJSON = () => {
    let json: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    
    for(let command of store.commands.values()) {
        let parent = json;
        for(let segment of command.path) {}

        let data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
            type: ApplicationCommandType.ChatInput,
            name: command.path[command.path.length - 1],
            description: "",
            options: [],
        };

        parent.push(data);
    }

    return json;
};



