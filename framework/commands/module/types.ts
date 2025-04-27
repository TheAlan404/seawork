import { Client } from "discord.js";
import { InternalCommandOption } from "../options";

export type AnyCommandComponentProps = {
    client: Client;
};

export type AnyCommandModule = {
    default?: React.ComponentType<AnyCommandComponentProps>;
    options?: InternalCommandOption[];
};
