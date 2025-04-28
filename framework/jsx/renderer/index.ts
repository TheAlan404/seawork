import { MessageFlags, type AnySelectMenuInteraction, type ButtonInteraction, type ChatInputCommandInteraction, type Interaction } from "discord.js";
import { InternalReactRenderer } from "../reconciler";
import type { Container } from "../reconciler/types";
import { debounceAsync } from "#core/utils/debounceAsync.ts";
import { DJSXEventHandlerMap, MessagePayloadOutput, PayloadBuilder } from "./payload";
import EventEmitter from "node:events";
import TypedEventEmitter from "typed-emitter";

export type DJSXRendererEventMap = {
    error: (e: Error) => void;
    fatalError: (e: Error) => void;
    inactivity: () => void;
    updatedMessage: (using: "reply" | "interaction" | "component") => void;
};

export class DJSXRenderer extends (EventEmitter as new () => TypedEventEmitter<DJSXRendererEventMap>) {
    key?: string;
    private renderer: InternalReactRenderer;
    private events: Partial<DJSXEventHandlerMap> | null = null;

    interaction: ChatInputCommandInteraction;
    lastInteraction: ButtonInteraction | AnySelectMenuInteraction | null = null;

    private inactivityTimer: NodeJS.Timeout;
    private INTERACTION_TOKEN_LIFE = 15 * 60 * 1000; // 15 minutes
    private deferUpdateTimeout: NodeJS.Timeout | null = null;
    private DEFER_TIME = 2 * 1000; // actually 3 seconds but we compromise

    constructor(
        interaction: ChatInputCommandInteraction,
        node?: React.ReactNode,
        key?: string,
    ) {
        super();
        this.interaction = interaction;
        this.node = node;
        this.key = key;
        this.renderer = new InternalReactRenderer();
        this.mount();

        this.inactivityTimer = setTimeout(
            () => this.emit("inactivity"),
            this.INTERACTION_TOKEN_LIFE
        );

        this.renderer.on("render", this.render.bind(this));
        this.renderer.on("renderError", this.handleError.bind(this));
    }

    node: React.ReactNode | null = null;

    mount() {
        this.renderer.setRenderedNode(this.node);
    }

    private prefixCustomId() {
        return `djsx:${this.key || "auto"}`;
    }

    async dispatchInteraction(interaction: Interaction) {
        if (this.key
            && "customId" in interaction
            && !interaction.customId.startsWith(this.prefixCustomId())
        ) return;

        if (interaction.isButton()) {
            let cb = this.events?.button?.get(interaction.customId);
            cb?.(interaction);
        } else if (interaction.isAnySelectMenu()) {
            let cb = this.events?.select?.get(interaction.customId);
            cb?.(interaction.values, interaction);
        } else if (interaction.isModalSubmit()) {
            let cb = this.events?.modalSubmit?.get(interaction.customId);
            let form: Record<string, string> = {};
            for (let [name, component] of interaction.fields.fields) {
                form[name] = component.value;
            }
            cb?.(form, interaction);
        };

        if (interaction.isButton() || interaction.isAnySelectMenu()) {
            let before = this.lastInteraction;
            this.lastInteraction = interaction;

            if (this.deferUpdateTimeout)
                clearTimeout(this.deferUpdateTimeout);
            this.deferUpdateTimeout = setTimeout(() => {
                this.lastInteraction?.deferUpdate();
                this.lastInteraction = null;
            }, this.DEFER_TIME);

            await before?.deferUpdate();
        }
    }

    private async render(container: Container) {
        if (!container.node) return;
        try {
            let payload = new PayloadBuilder(this.prefixCustomId.bind(this))
                .createMessage(container.node);
            this.events = payload.eventHandlers;
            this.updateMessageDebounced(payload);
        } catch (e) {
            this.handleError(e as Error);
        };
    }


    private readonly updateMessageDebounced = debounceAsync(async (payload: MessagePayloadOutput) => {
        try {
            await this.updateMessage(payload);
        } catch (e) {
            await this.handleError(e as Error);
        }
    }, 0);

    private async updateMessage(output: MessagePayloadOutput) {
        const { flags, payload } = output;

        if (this.lastInteraction) {
            await this.lastInteraction.update({
                ...payload,
            });

            this.lastInteraction = null;
            if (this.deferUpdateTimeout)
                clearTimeout(this.deferUpdateTimeout);

            this.emit("updatedMessage", "component");
        } else if (this.interaction.replied || this.interaction.deferred) {
            await this.interaction.editReply({
                withComponents: true,
                ...payload,
            });

            this.emit("updatedMessage", "interaction");
        } else {
            await this.interaction.reply({
                withResponse: true,
                flags,
                ...payload,
            });

            this.emit("updatedMessage", "reply");
        }

        this.inactivityTimer.refresh();
    }

    async handleError(error: Error) {
        try {
            this.emit("error", error);

            const content = `:warning: **Error**\n\`\`\`\n${error.toString()}\n\`\`\``;

            await this.updateMessage({
                flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2],
                eventHandlers: {
                    button: new Map(),
                    select: new Map(),
                },
                payload: {
                    components: [
                        {
                            type: 10,
                            content,
                        }
                    ],
                },
            });
        } catch (e) {
            this.emit("fatalError", e as Error);
            console.log("[discordjsx/renderer] (fatal) Error", e);
        }
    }
}
