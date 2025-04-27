import { ApplicationCommandOptionType } from "discord.js";
import { InternalCommand } from "../types";
import { InternalCommandOption } from "../options";
import { CommandOptionChoice } from "../options/base";

export const typegenHeader = () => [
    `import * as T from "#core/commands/typegen/types.ts";`,
    `import * as DJS from "discord.js";`,
].join("\n");

export const typegenCommand = (cmd: InternalCommand) => {
    return [
        `declare module "${["bot", "commands", ...cmd.path].join("/")}" {`,
        indented([
            `namespace Command {`,
            indented([
                `type Options = T.InternalCommandOption[];`,
                `type Execute = T.AnyCommandModule["execute"];`,
                `type Details = T.AnyCommandModule["details"];`,
                `type ComponentProps = T.BaseCommandContext & {`,
                indented([
                    `options: {`,
                    indented(cmd.options?.map(opt => (
                        `${opt.name}: ${typegenCommandOption(opt)}${!opt.data.required ? " | null" : ""};`
                    )) || []),
                    `};`,
                ]),
                `};`,
            ]),
            `}`,
        ]),
        `}`,
    ].join("\n");
};

export const typegenCommandOption = (opt: InternalCommandOption) => {
    const typegenChoices = <T>(choices: CommandOptionChoice<T>[]) => choices.map(choice => JSON.stringify(choice.value)).join(" | ");

    switch (opt.type) {
        case ApplicationCommandOptionType.String:
            if ("autocomplete" in opt.data) return "string";
            if (opt.data.choices) return typegenChoices(opt.data.choices);
            return "string";
        case ApplicationCommandOptionType.Number:
        case ApplicationCommandOptionType.Integer:
            if ("autocomplete" in opt.data) return "number";
            if (opt.data.choices) return typegenChoices(opt.data.choices);
            return "number";
        case ApplicationCommandOptionType.Boolean:
            return "boolean";
        case ApplicationCommandOptionType.Role:
            return "DJS.Role"; // ?
        case ApplicationCommandOptionType.Channel:
            return "DJS.Channel"; // TODO: narrow based on opt.data.channelTypes
        case ApplicationCommandOptionType.User:
            return "DJS.User"; // ?
        case ApplicationCommandOptionType.Attachment:
            return "DJS.Attachment"; // ??
        default:
            return "unknown";
    }
};

export const indented = (lines: string[]) => lines
    .join("\n")
    .split("\n")
    .map(x => "\t" + x)
    .join("\n")
