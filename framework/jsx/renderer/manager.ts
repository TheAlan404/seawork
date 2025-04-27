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
                if(inst.id !== cmd.path.join(" ")) continue;
                inst.mount(); // is this even needed?
            }
        });
    }

    create(
        command: InternalCommand,
        interaction: ChatInputCommandInteraction,
        node?: ReactNode,
    ) {
        const renderer = new RendererInstance(
            command.path.join(" "),
            interaction,
            node,
        );
        try {
            renderer.mount();
            console.log("Renderer created", renderer);
            this.instances.add(renderer);
        } catch(e) { console.log(e) }
    }

    dispatchInteraction(int: Interaction) {
        console.log("Dispatching interactions to ", this.instances)
        for(let inst of this.instances) {
            inst.events.dispatch(int);
        }
    }
}

export const renderers = new RenderersManager();
