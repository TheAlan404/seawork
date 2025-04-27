import { Client } from "discord.js";
import { InternalCommandOption } from "../options";
import { CommandDetails } from "../types";

export type BaseComponentProps = {
    client: Client;
    options: {};
};

export type AnyCommandModule = {
    details?: CommandDetails;
    default?: React.ComponentType<BaseComponentProps>;
    options?: InternalCommandOption[];
};
