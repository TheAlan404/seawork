import { ClientOptions } from "discord.js";

export type SeaworkConfig = {
    client?: Partial<ClientOptions>;
};

export const defineConfig = (x: SeaworkConfig) => x;
