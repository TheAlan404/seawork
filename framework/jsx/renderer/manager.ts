import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { RendererInstance } from ".";
import { ReactNode } from "react";

export class RenderersManager {
    instances: Set<RendererInstance> = new Set();

    constructor() {
        
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
