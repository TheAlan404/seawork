import type { AnySelectMenuInteraction, ButtonInteraction, ComponentType, Interaction } from "discord.js";
import type { EventHandler } from "../intrinsics/elements";

export class RendererEventContainer {
    buttonOnClick: Map<string, (i: ButtonInteraction) => void> = new Map();
    selectOnSelect: Map<string, (t: any, i: AnySelectMenuInteraction) => void> = new Map();

    clear() {
        this.buttonOnClick.clear();
    }

    registerButtonOnClick(id: string, handler?: EventHandler<ButtonInteraction>) {
        if(!handler) return;
        this.buttonOnClick.set(id, handler);
    }

    registerSelectOnSelect(id: string, handler?: (t: any, i: AnySelectMenuInteraction) => any) {
        if(!handler) return;
        this.selectOnSelect.set(id, handler);
    }

    dispatch(int: Interaction) {
        if(int.isButton()) {
            let cb = this.buttonOnClick.get(int.customId);
            cb?.(int);
        } else if(int.isAnySelectMenu()) {
            let cb = this.selectOnSelect.get(int.customId);

            console.log("LOGHOOK#1",int.values);

            if(int.isStringSelectMenu()) {
                let v = int.values;
                cb?.(v, int);
            } else if(int.isUserSelectMenu()) {
                let v = int.values;
                cb?.(v, int);
            } else if(int.isRoleSelectMenu()) {
                let v = int.values;
                cb?.(v, int);
            } else if(int.isMentionableSelectMenu()) {
                let v = int.values;
                cb?.(v, int);
            } else if(int.isChannelSelectMenu()) {
                let v = int.values;
                cb?.(v, int);
            }
        }
    }
};
