import { ChatInputCommandInteraction, Client } from "discord.js";
import { InternalCommandOption } from "./options";

export interface BaseCommandContext {
    client: Client;
    interaction: ChatInputCommandInteraction;
};

export interface ExecutionContext extends BaseCommandContext {
    render: () => void;
};

export interface AnyCommandModule {
    details?: CommandDetails;
    execute?: (ctx: ExecutionContext) => any;
    default?: React.ComponentType<BaseCommandContext>;
    options?: InternalCommandOption[];
};

export interface InternalCommand extends AnyCommandModule {
    path: string[];
};

export type CommandDetails = {
    description?: string;
};
