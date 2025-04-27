import type { ButtonInteraction } from "discord.js";
import type { BaseInteractableProps } from "./base";
import { DJSXEventHandler } from "./events";

export interface BaseButtonProps extends BaseInteractableProps {
    disabled?: boolean;
    // TODO: emoji
};

export interface DefaultButtonProps extends BaseButtonProps {
    style?: "primary" | "secondary" | "success" | "danger";
    onClick?: DJSXEventHandler<void, ButtonInteraction>;
};

export interface LinkButtonProps extends BaseButtonProps {
    url: string;
};

export interface PremiumButtonProps extends BaseButtonProps {
    skuId: string;
};

export type ButtonProps = DefaultButtonProps | LinkButtonProps | PremiumButtonProps;
