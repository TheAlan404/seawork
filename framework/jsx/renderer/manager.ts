import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { RendererInstance } from ".";
import { ReactNode } from "react";
import { InternalCommand } from "#core/commands/types.ts";
import { store } from "#core/commands/store/store.ts";

export class RenderersManager {
    instances: Set<RendererInstance> = new Set();

    constructor() {
        store.on("commandUpdate", (cmd) => {
            for(let inst of this.instances) {
                inst.mount(); // mmm
            }
        });
    }

    create(
        interaction: ChatInputCommandInteraction,
        node?: ReactNode,
    ) {
        const renderer = new RendererInstance(
            interaction,
            node,
        );
        
        renderer.mount();
        console.log("Renderer created", renderer);
        this.instances.add(renderer);
    }

    dispatchInteraction(int: Interaction) {
        console.log("Dispatching interactions to ", this.instances)
        for(let inst of this.instances) {
            inst.events.dispatch(int);
        }
    }
}

export const renderers = new RenderersManager();
