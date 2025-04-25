import { ApplicationCommandType, Interaction } from "discord.js";
import { store } from "../store/store";
import { InternalCommand } from "../store/types";
import { renderers } from "../jsx/renderer";
import { createElement } from "react";

export const handleInteraction = async (interaction: Interaction) => {
    if(interaction.isChatInputCommand()) {
        let current: Map<string, InternalCommand> = store.commands;
        let commandPath = [
            interaction.options.getSubcommandGroup(false),
            interaction.options.getSubcommand(false),
        ].filter(x => x !== null);
        for(let segment of commandPath) {
            current = current.get(segment)?.children || new Map();
        }

        let cmd = current.get(interaction.commandName);
        if(!cmd) return console.log("Command not found in store", interaction.commandName);
        if(!cmd.component) return console.log("Command does not have a component", interaction.commandName);

        await interaction.deferReply({ flags: ["Ephemeral"] });

        console.log("Rendering " + cmd.name);
        renderers.create(cmd, interaction, createElement(cmd.component));
    }
};
