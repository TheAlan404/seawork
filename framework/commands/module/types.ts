import { Client } from "discord.js";

export type AnyCommandComponentProps = {
    client: Client;
};

export type AnyCommandModule = {
    default?: React.ComponentType<AnyCommandComponentProps>;
};
