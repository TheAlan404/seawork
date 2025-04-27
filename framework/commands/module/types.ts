import { Client } from "discord.js";
import { InternalCommandOption } from "../options";

export type BaseComponentProps = {
    client: Client;
};

export type AnyCommandModule = {
    default?: React.ComponentType<BaseComponentProps>;
    options?: InternalCommandOption[];
};
