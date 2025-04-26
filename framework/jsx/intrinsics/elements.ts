import { APIStringSelectComponent, APIMediaGalleryItem, ChannelType } from "discord-api-types/v10";
import { ButtonInteraction, ColorResolvable } from "discord.js";
import { PropsWithChildren } from "react";

export interface BaseInteractableProps {
    customId?: string;
};

export interface BaseSelectProps extends BaseInteractableProps {
    min?: number;
    max?: number;
    disabled?: boolean;
    placeholder?: string;
};

export type UnfurledMediaResolvable = string;

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

    button: BaseInteractableProps & {
        style?: "primary" | "secondary" | "success" | "danger";
        url?: string;
        skuId?: string;
        disabled?: boolean;
        // emoji
        onClick?: EventHandler<ButtonInteraction>;
    } & PropsWithChildren;

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

    select: BaseSelectProps & ({
        type: "string";
        options: APIStringSelectComponent["options"];
        value?: boolean;
        onSelect?: () => void;
    } | {
        type: "user" | "role";
        value?: string[];
        onSelect?: () => void;
    } | {
        type: "mentionable";
        value?: { id: string; type: "user" | "role" }[];
        onSelect?: () => void;
    } | {
        type: "channel";
        channelTypes?: ChannelType[];
        value?: string[];
        onSelect?: () => void;
    });
};
