import { APIApplicationCommandOption, ApplicationCommandOptionType, ApplicationCommandType, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { store } from "../store/store";
import { InternalCommandOption } from "../options";

// TODO: serialize cmd.options
// TODO: subcommands + subcommand groups

export const createCommandsJSON = () => {
    let json: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

    for (let command of store.commands.values()) {
        let parent = json;
        for (let segment of command.path) { }

        let data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
            type: ApplicationCommandType.ChatInput,
            name: command.path[command.path.length - 1],
            description: command.path[command.path.length - 1],
            options: [],
        };

        for(let opt of command.options || [])
            data.options?.push(commandOptionToDiscord(opt));

        parent.push(data);
    }

    return json;
};

export const commandOptionToDiscord = (opt: InternalCommandOption): APIApplicationCommandOption => {
    return {
        type: opt.type,
        name: opt.name,
        description: opt.data.description || opt.name,
        required: opt.data.required,
        autocomplete: "autocomplete" in opt.data,
        choices: "choices" in opt.data ? opt.data.choices : undefined,
        ...(opt.type == ApplicationCommandOptionType.String ? {
            min_length: opt.data.min,
            max_length: opt.data.max,
        } : {}),
        ...(opt.type == ApplicationCommandOptionType.Number || opt.type == ApplicationCommandOptionType.Integer ? (
            "autocomplete" in opt.data ? {} : {
                min_value: opt.data.min,
                max_value: opt.data.max,
            }
        ) : {}),
        ...(opt.type == ApplicationCommandOptionType.Channel ? {
            channel_types: opt.data.channelTypes,
        } : {}),
    } as APIApplicationCommandOption;
};

