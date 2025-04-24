import { SlashCommandBuilder } from "discord.js";

export type CommandsConfig = SlashCommandDefinition[];

export type SlashCommandDefinition = {
    name: string;
    description: string;
};

export const slashCommand = (
    path: string,
    x: SlashCommandDefinition,
) => {
    let b = new SlashCommandBuilder();
    b.setName(x.name);
    b.setDescription(x.description);

    return b.toJSON();
};




