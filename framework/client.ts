import { Client } from "discord.js";
import config from "../config";
import { Hot } from "dynohot";

const hot: Hot<{ client?: Client }> | undefined = import.meta.hot;
export const client = hot?.data?.client ?? await async function() {
    const client = new Client({
        intents: ["Guilds"],
        ...config?.client,
    });

    return client;
}();

hot?.dispose(data => {
    data.client = client;
});
