import { ChatInputCommandInteraction } from "discord.js";
import { ExecutionContext, InternalCommand } from "../types";
import { renderers } from "#core/jsx/renderer/index.ts";

export const runInteractionCommand = (
    interaction: ChatInputCommandInteraction,
    cmd: InternalCommand,
) => {
    const options: Record<string, any> = {};

    for (let option of interaction.options.data) {
        options[option.name] = option.value
            || option.user
            || option.role
            || option.channel
            || option.attachment
            || option.member;
    };

    const ctx: ExecutionContext = {
        client: interaction.client,
        interaction,
        options,
        render: () => {
            if (!cmd.default) return console.log("ExecutionContext#render() called on a command with no default export");
            renderers.create(cmd, interaction);
        },
    };

    let exec = cmd.execute || defaultExecute;
    exec(ctx);
};

export const defaultExecute = async (ctx: ExecutionContext) => {
    ctx.render();
};
