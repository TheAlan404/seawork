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
            `type OptionsType = {`,
            indented(typegenCommandOptionsObject(cmd.options || [])),
            `};`,
            "",
            `type Context = {`,
            indented([
                `options: OptionsType;`,
            ]),
            `};`,
            "",
            `namespace Command {`,
            indented([
                `type Options = T.InternalCommandOption[];`,
                `type Execute = (ctx: T.ExecutionContext & Context) => any;`,
                `type Details = T.AnyCommandModule["details"];`,
                `type ComponentProps = T.BaseCommandContext & Context;`,
            ]),
            `}`,
        ]),
        `}`,
    ].join("\n");
};

export const typegenCommandOptionsObject = (opts: InternalCommandOption[]) => {
    return (opts?.map(opt => (
        `${opt.name}: ${typegenCommandOption(opt)}${!opt.data.required ? " | null" : ""};`
    )) || []);
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
