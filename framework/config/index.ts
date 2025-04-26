import { ClientOptions } from "discord.js";

export type SeaworkConfig = {
    client?: Partial<ClientOptions>;
    clientId: string;
    
    /// For testing
    guildId?: string;
    login?: boolean;
};

export const defineConfig = (x: SeaworkConfig) => x;
