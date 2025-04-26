import type { APIStringSelectComponent, APIMediaGalleryItem, ChannelType, APISelectMenuOption } from "discord-api-types/v10";
import type { ButtonInteraction, ColorResolvable, StringSelectMenuInteraction, UserSelectMenuInteraction } from "discord.js";
import type { PropsWithChildren } from "react";
import type { UnfurledMediaResolvable } from "./base";
import type { SelectProps } from "./select";
import type { ButtonProps } from "./button";

export type EventHandler<T> = (event: T) => any;

export interface SeaworkElements {
    message: PropsWithChildren<{
        v2?: boolean;
        ephemeral?: boolean;
    }>;

    container: PropsWithChildren<{
        color?: ColorResolvable;
        spoiler?: boolean;
    }>;
    actionRow: PropsWithChildren;
    section: PropsWithChildren;
    accessory: PropsWithChildren;

    text: PropsWithChildren;
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

    button: PropsWithChildren<ButtonProps>;
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
