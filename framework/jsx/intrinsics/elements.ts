import { APIStringSelectComponent, APIMediaGalleryItem, ChannelType, APISelectMenuOption } from "discord-api-types/v10";
import { ButtonInteraction, ColorResolvable, StringSelectMenuInteraction, UserSelectMenuInteraction } from "discord.js";
import { PropsWithChildren } from "react";
import { UnfurledMediaResolvable } from "./base";
import { SelectProps } from "./select";
import { ButtonProps } from "./button";

export type EventHandler<T> = (event: T) => any;

export interface SeaworkElements {
    message: {
        v2?: boolean;
        ephemeral?: boolean;
    } & PropsWithChildren;

    container: {
        color?: ColorResolvable;
        spoiler?: boolean;
    } & PropsWithChildren;
    actionRow: {} & PropsWithChildren;
    section: {} & PropsWithChildren;
    accessory: {} & PropsWithChildren;

    text: {} & PropsWithChildren;
    thumbnail: {
        description?: string;
        spoiler?: boolean;
        media?: UnfurledMediaResolvable;
    };

    gallery: {
        items?: APIMediaGalleryItem[];
    };

    file: {
        file: UnfurledMediaResolvable;
        spoiler?: boolean;
    };

    seperator: {
        divider?: boolean;
        spacing?: "sm" | "lg";
    };

    button: ButtonProps & PropsWithChildren;
    select: SelectProps;

    textInput: {
        label: string;
        placeholder?: string;
        customId?: string;
        paragraph?: boolean;
        required?: boolean;
        min?: number;
        max?: number;
        value?: string;
        // onSubmit?: EventHandler<{}>;
    };
};
