import type { APIStringSelectComponent, APIMediaGalleryItem, ChannelType, APISelectMenuOption } from "discord-api-types/v10";
import type { ButtonInteraction, ColorResolvable, StringSelectMenuInteraction, UserSelectMenuInteraction } from "discord.js";
import type { PropsWithChildren } from "react";
import type { UnfurledMediaResolvable } from "./base";
import type { SelectProps } from "./select";
import type { ButtonProps } from "./button";

export interface SeaworkElements {
    message: PropsWithChildren<{
        v2?: boolean;
        ephemeral?: boolean;
    }> & React.JSX.IntrinsicAttributes;
    modal: PropsWithChildren<{
        title: string;
        customId?: string;
        onSubmit?: () => void;
    }> & React.JSX.IntrinsicAttributes;

    container: PropsWithChildren<{
        color?: ColorResolvable;
        spoiler?: boolean;
    }> & React.JSX.IntrinsicAttributes;
    row: PropsWithChildren & React.JSX.IntrinsicAttributes;
    section: PropsWithChildren & React.JSX.IntrinsicAttributes;
    accessory: PropsWithChildren & React.JSX.IntrinsicAttributes;

    text: PropsWithChildren & React.JSX.IntrinsicAttributes;
    thumbnail: {
        description?: string;
        spoiler?: boolean;
        media?: UnfurledMediaResolvable;
    } & React.JSX.IntrinsicAttributes;

    gallery: {
        items?: APIMediaGalleryItem[];
    } & React.JSX.IntrinsicAttributes;

    file: {
        file: UnfurledMediaResolvable;
        spoiler?: boolean;
    } & React.JSX.IntrinsicAttributes;

    separator: {
        divider?: boolean;
        spacing?: "sm" | "lg";
    } & React.JSX.IntrinsicAttributes;

    button: PropsWithChildren<ButtonProps> & React.JSX.IntrinsicAttributes;
    select: SelectProps & React.JSX.IntrinsicAttributes;

    textInput: {
        label: string;
        placeholder?: string;
        customId?: string;
        paragraph?: boolean;
        required?: boolean;
        min?: number;
        max?: number;
        value?: string;
    } & React.JSX.IntrinsicAttributes;
};
