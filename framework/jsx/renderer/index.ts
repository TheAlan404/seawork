import { ChatInputCommandInteraction, Interaction, InteractionResponseType, Routes } from "discord.js";
import { InternalReactRenderer } from "../reconciler";
import { transformContainerToMessagePayload } from "./transform";
import { InternalCommand } from "../../store/types";
import { createElement } from "react";
import { Container } from "../reconciler/types";

export class RendererInstance {
    renderer: InternalReactRenderer;
    interaction: Interaction;
    command: InternalCommand;

    constructor(interaction: Interaction, command: InternalCommand) {
        this.renderer = new InternalReactRenderer();
        this.interaction = interaction;
        this.command = command;

        this.renderer.on("render", (container) => {
            this.render(container);
        });

        this.renderer.on("renderError", (e) => this.handleError(e));

        this.renderer.on("containerUpdated", () => console.log("[renderer] Container updated"));
    }

    setNode(node: React.ReactNode) {
        this.renderer.setRenderedNode(node);
    }

    async render(container: Container) {
        let payload = transformContainerToMessagePayload(container);
        if(!payload) return console.log("Failed to compute message payload");
        
        try {
            await this.editReply(payload);
            console.log("[renderer] Message updated")
        } catch(e) {
            console.log("[renderer] Message update error", e);
            this.handleError(e as Error);
        }
    }

    async editReply(body: any) {
        return await this.interaction.client.rest.patch(Routes.webhookMessage(this.interaction.client.application.id, this.interaction.token), {
            body,
            query: new URLSearchParams([
                ["with_components", "true"]
            ]),
        });
    }

    async handleError(error: Error) {
        const content = `:warning: **Error**\n\`\`\`\n${error.toString()}\n\`\`\``;

        try {
            await this.editReply({
                flags: 1 << 15,
                components: [
                    {
                        type: 10,
                        content,
                    }
                ],
            });
        } catch(e) {
            console.log("report error error", e)
        }
    }
}



export class RenderersManager {
    instances: Set<RendererInstance> = new Set();

    create(command: InternalCommand, interaction: Interaction, node: React.ReactNode) {
        const renderer = new RendererInstance(interaction, command);
        renderer.setNode(node);
        this.instances.add(renderer);
    }

    updateCommand(newCommand: InternalCommand) {
        for(let inst of this.instances) {
            if(inst.command.id !== newCommand.id) continue;
            
            inst.command = newCommand;

            if(!inst.command.component) continue;
            inst.setNode(createElement(inst.command.component));
        }
    }
}

export const renderers = new RenderersManager();
