import { ButtonInteraction } from "discord.js";
import { BaseInteractableProps } from "./base";

export interface BaseButtonProps extends BaseInteractableProps {
    disabled?: boolean;
    // TODO: emoji
};

export interface DefaultButtonProps extends BaseButtonProps {
    style?: "primary" | "secondary" | "success" | "danger";
    onClick?: (int: ButtonInteraction) => void;
};

export interface LinkButtonProps extends BaseButtonProps {
    url: string;
};

export interface PremiumButtonProps extends BaseButtonProps {
    skuId: string;
};

export type ButtonProps = DefaultButtonProps | LinkButtonProps | PremiumButtonProps;
