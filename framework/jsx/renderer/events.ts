import type { AnySelectMenuInteraction, ButtonInteraction, ComponentType, Interaction, ModalSubmitInteraction, Snowflake } from "discord.js";
import { DJSXEventHandler } from "../intrinsics/events";

export class RendererEventContainer {
    onButtonClick: Map<string, DJSXEventHandler<void, ButtonInteraction>> = new Map();
    onSelect: Map<string, DJSXEventHandler<Snowflake[], AnySelectMenuInteraction>> = new Map();
    onModalSubmit: Map<string, DJSXEventHandler<Record<string, string>, ModalSubmitInteraction>> = new Map();

    clear() {
        this.onButtonClick.clear();
        this.onSelect.clear();
        this.onModalSubmit.clear();
    }

    registerButton(id: string, handler?: DJSXEventHandler<void, ButtonInteraction>) {
        if(!handler) return;
        this.onButtonClick.set(id, handler);
    }

    registerSelect(id: string, handler?: DJSXEventHandler<Snowflake[], AnySelectMenuInteraction>) {
        if(!handler) return;
        this.onSelect.set(id, handler);
    }

    registerModal(id: string, handler?: DJSXEventHandler<Record<string, string>, ModalSubmitInteraction>) {
        if(!handler) return;
        this.onModalSubmit.set(id, handler);
    }

    dispatch(int: Interaction) {
        if(int.isButton()) {
            let cb = this.onButtonClick.get(int.customId);
            cb?.(int);
        } else if(int.isAnySelectMenu()) {
            let cb = this.onSelect.get(int.customId);
            cb?.(int.values, int);
        } else if(int.isModalSubmit()) {
            let cb = this.onModalSubmit.get(int.customId);
            let form: Record<string, string> = {};
            for(let [name, component] of int.fields.fields) {
                form[name] = component.value;
            }
            cb?.(form, int);
        }
    }
};
