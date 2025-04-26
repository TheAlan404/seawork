import type { APISelectMenuOption, ChannelSelectMenuInteraction, ChannelType, MentionableSelectMenuInteraction, RoleSelectMenuInteraction, Snowflake, StringSelectMenuInteraction, UserSelectMenuInteraction } from "discord.js";
import type { BaseInteractableProps } from "./base";

export interface BaseSelectProps extends BaseInteractableProps {
    min?: number;
    max?: number;
    disabled?: boolean;
    placeholder?: string;
};

export interface StringSelectProps extends BaseSelectProps {
    type: "string";
    options: Omit<APISelectMenuOption, "default">[];
    defaultValues?: Snowflake[];
    onSelect?: (value: Snowflake[], interaction: StringSelectMenuInteraction) => void;
}

export interface UserSelectProps extends BaseSelectProps {
    type: "user";
    defaultValues?: Snowflake[];
    onSelect?: (value: Snowflake[], interaction: UserSelectMenuInteraction) => void;
};

export interface RoleSelectProps extends BaseSelectProps {
    type: "role";
    defaultValues?: Snowflake[];
    onSelect?: (value: Snowflake[], interaction: RoleSelectMenuInteraction) => void;
};

export interface MentionableSelectProps extends BaseSelectProps {
    type: "mentionable";
    defaultValues?: { id: Snowflake; type: "user" | "role" }[];
    onSelect?: (value: Snowflake[], interaction: MentionableSelectMenuInteraction) => void;
};

export interface ChannelSelectProps extends BaseSelectProps {
    type: "channel";
    channelTypes?: ChannelType[];
    defaultValues?: Snowflake[];
    onSelect?: (value: Snowflake[], interaction: ChannelSelectMenuInteraction) => void;
};

export type SelectProps = StringSelectProps | UserSelectProps | RoleSelectProps | MentionableSelectProps | ChannelSelectProps;
