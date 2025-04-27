import { ApplicationCommandOptionType } from "discord.js";
import { CommandNumberLikeOption } from "./opts/number";
import { CommandAttachmentOption, CommandBooleanOption, CommandChannelOption, CommandMentionableOption, CommandRoleOption, CommandUserOption } from "./opts/other";
import { CommandStringOption } from "./opts/string";

type InternalMap = {
    [ApplicationCommandOptionType.String]: CommandStringOption;
    [ApplicationCommandOptionType.Number]: CommandNumberLikeOption;
    [ApplicationCommandOptionType.Integer]: CommandNumberLikeOption;
    [ApplicationCommandOptionType.User]: CommandUserOption;
    [ApplicationCommandOptionType.Role]: CommandRoleOption;
    [ApplicationCommandOptionType.Channel]: CommandChannelOption;
    [ApplicationCommandOptionType.Mentionable]: CommandMentionableOption;
    [ApplicationCommandOptionType.Boolean]: CommandBooleanOption;
    [ApplicationCommandOptionType.Attachment]: CommandAttachmentOption;
};

export type InternalCommandOption = {
    [K in keyof InternalMap]: {
        type: K;
        name: string;
        data: InternalMap[K];
    };
}[keyof InternalMap];

export const string = (name: string, data: CommandStringOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.String,
    };
};

export const integer = (name: string, data: CommandNumberLikeOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Integer,
    };
}

export const number = (name: string, data: CommandNumberLikeOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Number,
    };
}

export const boolean = (name: string, data: CommandBooleanOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Boolean,
    };
}

export const channel = (name: string, data: CommandChannelOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Channel,
    };
}

export const user = (name: string, data: CommandUserOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.User,
    };
}

export const role = (name: string, data: CommandRoleOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Role,
    };
}

export const mentionable = (name: string, data: CommandMentionableOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Mentionable,
    };
}

export const attachment = (name: string, data: CommandAttachmentOption): InternalCommandOption => {
    return {
        name,
        data,
        type: ApplicationCommandOptionType.Attachment,
    };
}
