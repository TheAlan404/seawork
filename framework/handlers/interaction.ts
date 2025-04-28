import { ApplicationCommandType, Interaction } from "discord.js";
import { store } from "../commands/store/store";
import { runInteractionCommand } from "#core/commands/execute/run.ts";
import { renderers } from "#core/jsx/renderer/manager.ts";

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
        console.log("recieved button")
        renderers.dispatchInteraction(interaction);
    } else if(interaction.isAnySelectMenu()) {
        renderers.dispatchInteraction(interaction);
    }
};

import.meta.hot?.accept();
