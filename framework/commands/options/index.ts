import { ApplicationCommandOptionType } from "discord.js";
import { CommandNumberLikeOption } from "./opts/number";
import { CommandAttachmentOption, CommandBooleanOption, CommandChannelOption, CommandMentionableOption, CommandRoleOption, CommandUserOption } from "./opts/other";
import { CommandStringOption } from "./opts/string";

export const string = (
    name: string,
    data: CommandStringOption
) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.String,
    };
};

export const integer = (name: string, data: CommandNumberLikeOption) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Integer,
    };
}

export const number = (name: string, data: CommandNumberLikeOption) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Number,
    };
}

export const boolean = (name: string, data: CommandBooleanOption) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Boolean,
    };
}

export const channel = (name: string, data: CommandChannelOption) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Channel,
    };
}

export const user = (name: string, data: CommandUserOption) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.User,
    };
}

export const role = (name: string, data: CommandRoleOption) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Role,
    };
}

export const mentionable = (name: string, data: CommandMentionableOption) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Mentionable,
    };
}

export const attachment = (name: string, data: CommandAttachmentOption) => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Attachment,
    };
}
