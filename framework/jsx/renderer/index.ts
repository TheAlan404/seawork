import { Interaction, InteractionResponseType, Routes } from "discord.js";
import { SeaworkReactRenderer } from "../reconciler";
import { transformContainerToMessagePayload } from "./transform";
import { InternalCommand } from "../../store/types";
import { createElement } from "react";
import { findCommandById, store } from "../../store/store";

export type RendererInstance = {
    renderer: SeaworkReactRenderer;
    interaction: Interaction;
    command: InternalCommand;
};

export class RenderersManager {
    instances: Set<RendererInstance> = new Set();

    create(command: InternalCommand, interaction: Interaction, node: React.ReactNode) {
        const renderer = new SeaworkReactRenderer();

        renderer.on("render", async (container) => {
            console.dir({container})
            let payload = transformContainerToMessagePayload(container);
            if(!payload) return console.log("Failed to compute message payload");
            await interaction.client.rest.patch(Routes.webhookMessage(interaction.client.application.id, interaction.token), {
                body: payload,
                query: new URLSearchParams([
                    ["with_components", "true"]
                ]),
            })
            console.log("[renderer] Message updated", payload.components)
        })

        renderer.on("containerUpdated", () => {
            console.log("[renderer] Container updated")
        })

        renderer.on("renderError", (e) => {
            console.log("[renderer] Render error", e)
        })

        renderer.setRenderedNode(node);

        let instance: RendererInstance = {
            interaction,
            renderer,
            command,
        };
        
        this.instances.add(instance);
    }

    updateCommand(newCommand: InternalCommand) {
        for(let inst of this.instances) {
            if(inst.command.id !== newCommand.id) continue;
            
            inst.command = newCommand;

            if(!inst.command.component) continue;
            inst.renderer.setRenderedNode(createElement(inst.command.component));
            console.log("changed!")
        }
    }
}

export const renderers = new RenderersManager();
