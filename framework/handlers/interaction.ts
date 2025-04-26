import { ApplicationCommandType, Interaction } from "discord.js";
import { store } from "../commands/store/store";
import { renderers } from "../jsx/renderer";

export const handleInteraction = async (interaction: Interaction) => {
    if(interaction.isChatInputCommand()) {
        let commandPath = [
            interaction.options.getSubcommandGroup(false),
            interaction.options.getSubcommand(false),
            interaction.commandName,
        ].filter(x => x !== null);
        
        let cmd = store.getCommand(commandPath);

        if(!cmd) return console.log("Command not found in store", interaction.commandName);
        if(!cmd.component) return console.log("Command does not have a component", interaction.commandName);

        console.log("Rendering " + cmd.path.join(" "));
        renderers.create(cmd, interaction);
    } else if(interaction.isButton()) {
        await interaction.deferUpdate();
        renderers.dispatchButtonClick(interaction);
    }
};

import.meta.hot?.accept();
