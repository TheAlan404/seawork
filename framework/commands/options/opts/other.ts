import { ChannelType } from "discord.js";
import { BaseCommandOption } from "../base";

export interface CommandBooleanOption extends BaseCommandOption {};
export interface CommandUserOption extends BaseCommandOption {};
export interface CommandRoleOption extends BaseCommandOption {};
export interface CommandMentionableOption extends BaseCommandOption {};

export interface CommandChannelOption extends BaseCommandOption {
    channelTypes?: ChannelType[];
};

export interface CommandAttachmentOption extends BaseCommandOption {};
