import { ApplicationCommandOptionType, type AnySelectMenuInteraction, type ButtonInteraction, type ChatInputCommandInteraction, type Interaction, type InteractionReplyOptions, type InteractionResponseType, type Routes } from "discord.js";
import { InternalReactRenderer } from "../reconciler";
import { type PayloadOutput, PayloadTransformer } from "./transform";
import type { Container } from "../reconciler/types";
import { RendererEventContainer } from "./events";
import { debounceAsync } from "#core/utils/debounceAsync.ts";

export class RendererInstance {
    id: string;
    renderer: InternalReactRenderer;
    interaction: ChatInputCommandInteraction;
    transformer: PayloadTransformer;
    events: RendererEventContainer;

    lastInteraction: ButtonInteraction | AnySelectMenuInteraction | null = null;
    initialReplied: boolean = false;

    constructor(
        id: string,
        interaction: ChatInputCommandInteraction,
        node?: React.ReactNode,
    ) {
        this.id = id;
        this.renderer = new InternalReactRenderer();
        this.interaction = interaction;
        this.events = new RendererEventContainer();
        this.transformer = new PayloadTransformer(this.events);
        this.node = node;

        this.renderer.on("render", (container) => {
            this.render(container);
        });

        this.renderer.on("renderError", (e) => this.handleError(e));

        this.renderer.on("containerUpdated", () => console.log("[renderer] Container updated"));
    }

    node: React.ReactNode | null = null;

    mount() {
        this.renderer.setRenderedNode(this.node);
    }

    async render(container: Container) {
        this.events.clear();
        let payload = this.transformer.toMessagePayload(container.node);
        if('error' in payload) return console.log(`Failed to compute message payload: ${payload.error}`);
        this.editReplyDebounced(payload);
    }

    private readonly editReplyDebounced = debounceAsync(async (payload: PayloadOutput) => {
        try {
            await this.editReply(payload);
            console.log("[renderer] Message updated")
        } catch(e) {
            console.log("[renderer] Message update error", e);
            await this.handleError(e as Error);
        }
    }, 0);

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
