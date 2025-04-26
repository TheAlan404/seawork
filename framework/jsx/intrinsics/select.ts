import { APISelectMenuOption, ChannelType, RoleSelectMenuInteraction, StringSelectMenuInteraction, UserSelectMenuInteraction } from "discord.js";
import { BaseInteractableProps } from "./base";

export interface BaseSelectProps extends BaseInteractableProps {
    min?: number;
    max?: number;
    disabled?: boolean;
    placeholder?: string;
};

export interface StringSelectProps extends BaseSelectProps {
    type: "string";
    options: Omit<APISelectMenuOption, "default">[];
    value?: string[];
    onSelect?: (value: string[], interaction: StringSelectMenuInteraction) => void;
}

export interface UserSelectProps extends BaseSelectProps {
    type: "user";
    value?: string[];
    onSelect?: (value: string[], interaction: UserSelectMenuInteraction) => void;
};

export interface RoleSelectProps extends BaseSelectProps {
    type: "role";
    value?: string[];
    onSelect?: (value: string[], interaction: RoleSelectMenuInteraction) => void;
};

export interface MentionableSelectProps extends BaseSelectProps {
    type: "mentionable";
    value?: { id: string; type: "user" | "role" }[];
    onSelect?: () => void;
};

export interface ChannelSelectProps extends BaseSelectProps {
    type: "channel";
    channelTypes?: ChannelType[];
    value?: string[];
    onSelect?: () => void;
};

export type SelectProps = StringSelectProps | UserSelectProps | RoleSelectProps | MentionableSelectProps | ChannelSelectProps;
