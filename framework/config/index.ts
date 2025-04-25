import { ClientOptions } from "discord.js";

export type SeaworkConfig = {
    client?: Partial<ClientOptions>;
    clientId: string;
    
    /// For testing
    guildIds?: string[];
    login?: boolean;
};

export const defineConfig = (x: SeaworkConfig) => x;
