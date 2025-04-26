import type { AnySelectMenuInteraction, ButtonInteraction, ChatInputCommandInteraction, Interaction, InteractionReplyOptions, InteractionResponseType, Routes } from "discord.js";
import { InternalReactRenderer } from "../reconciler";
import { type PayloadOutput, PayloadTransformer } from "./transform";
import type { InternalCommand } from "../../commands/types";
import { createElement, Fragment } from "react";
import type { Container } from "../reconciler/types";
import { store } from "../../commands/store/store";
import { RendererEventContainer } from "./events";

export class RendererInstance {
    renderer: InternalReactRenderer;
    interaction: ChatInputCommandInteraction;
    command: InternalCommand;
    transformer: PayloadTransformer;
    events: RendererEventContainer;

    initialReplied: boolean = false;

    constructor(interaction: ChatInputCommandInteraction, command: InternalCommand) {
        this.renderer = new InternalReactRenderer();
        this.interaction = interaction;
        this.command = command;
        this.events = new RendererEventContainer();
        this.transformer = new PayloadTransformer(this.events);

        this.renderer.on("render", (container) => {
            this.render(container);
        });

        this.renderer.on("renderError", (e) => this.handleError(e));

        this.renderer.on("containerUpdated", () => console.log("[renderer] Container updated"));
    }

    setNode() {
        let node = createElement(this.command.component ?? Fragment);
        this.renderer.setRenderedNode(node);
    }

    async initialRun() {
        // await this.interaction.deferReply({ flags: ["Ephemeral"] });
    }

    async render(container: Container) {
        this.events.clear();
        let payload = this.transformer.toMessagePayload(container.node);
        if(!payload) return console.log("Failed to compute message payload");
        
        try {
            await this.editReply(payload);
            console.log("[renderer] Message updated")
        } catch(e) {
            console.log("[renderer] Message update error", e);
            this.handleError(e as Error);
        }
    }

    async editReply(payload: PayloadOutput) {
        try {
            const { v2, ephemeral, ...body } = payload;

            if(!this.initialReplied) {
                let flags: ("Ephemeral" | "IsComponentsV2")[] = [];

                if(v2) flags.push("IsComponentsV2");
                if(ephemeral) flags.push("Ephemeral");

                await this.interaction.reply({
                    withResponse: true,
                    flags,
                    ...body,
                });

                this.initialReplied = true;
            } else {
                await this.interaction.editReply({
                    withComponents: true,
                    ...body,
                });
            }
        } catch(e) {
            await this.handleError(e as Error);
        }
    }

    async handleError(error: Error) {
        try {
            const content = `:warning: **Error**\n\`\`\`\n${error.toString()}\n\`\`\``;
            
            await this.editReply({
                v2: true,
                ephemeral: true,
                components: [
                    {
                        type: 10,
                        content,
                    }
                ],
            });
        } catch(e) {
            console.log("=== UNRENDERABLE ERROR ===")
            console.log("--- ORIGINAL ---")
            console.log(error);
            console.log("--- REPORT ERROR ---")
            console.log(e);
        }
    }
}

export class RenderersManager {
    instances: Set<RendererInstance> = new Set();

    constructor() {
        store.on("commandUpdate", (cmd) => {
            for(let inst of this.instances) {
                if(inst.command.path.join(" ") !== cmd.path.join(" ")) continue;
                inst.command = cmd;
                if(!inst.command.component) continue;
                inst.setNode();
            }
        });
    }

    create(command: InternalCommand, interaction: ChatInputCommandInteraction) {
        const renderer = new RendererInstance(interaction, command);
        renderer.setNode();
        renderer.initialRun();
        this.instances.add(renderer);
    }

    dispatchInteraction(int: Interaction) {
        for(let inst of this.instances) {
            inst.events.dispatch(int);
        }
    }
}

export const renderers = new RenderersManager();

import.meta.hot?.accept();
