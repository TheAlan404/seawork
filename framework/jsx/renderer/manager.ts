import { ChatInputCommandInteraction, Collection, Interaction } from "discord.js";
import { DJSXRenderer } from ".";
import { ReactNode } from "react";
import { v4 } from "uuid";

export class DJSXRendererManager {
    renderers: Collection<string, DJSXRenderer> = new Collection();

    constructor() {}

    create(
        interaction: ChatInputCommandInteraction,
        node?: ReactNode,
    ) {
        const renderer = new DJSXRenderer(
            interaction,
            node,
        );

        this.add(renderer);
    }
    
    add(renderer: DJSXRenderer) {
        if(!renderer.key) renderer.key = v4();
        this.renderers.set(renderer.key, renderer);
    };

    dispatchInteraction(int: Interaction) {
        this.renderers.forEach((renderer) => renderer.dispatchInteraction(int));
    }
}

export const renderers = new DJSXRendererManager();
