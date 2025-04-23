import { defineConfig } from "@seawork/core";
import { socksDispatcher } from 'fetch-socks';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const proxy = 'socks5h://127.0.0.1:40000';
const agent = socksDispatcher({
    type: 5,
    host: '127.0.0.1',
    port: 40000,
}, {
    allowH2: true,
});

export default defineConfig({
    client: {
        intents: ["Guilds"],
        rest: {
            // agent,
        },
    },
});
