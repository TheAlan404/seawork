import { ApplicationCommandType, Interaction } from "discord.js";
import { store } from "../commands/store/store";
import { renderers } from "../jsx/renderer";
import { runInteractionCommand } from "#core/commands/execute/run.ts";

export const handleInteraction = async (interaction: Interaction) => {
    if(interaction.isChatInputCommand()) {
        let commandPath = [
            interaction.options.getSubcommandGroup(false),
            interaction.options.getSubcommand(false),
            interaction.commandName,
        ].filter(x => x !== null);
        
        let cmd = store.getCommand(commandPath);

        if(!cmd) return console.log("Command not found in store", interaction.commandName);

        runInteractionCommand(interaction, cmd);
    } else if(interaction.isButton()) {
        await interaction.deferUpdate();
        renderers.dispatchInteraction(interaction);
    } else if(interaction.isAnySelectMenu()) {
        await interaction.deferUpdate();
        renderers.dispatchInteraction(interaction);
    }
};

import.meta.hot?.accept();
