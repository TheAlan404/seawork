import { createServer } from "vite";
import { Client, Events, GatewayIntentBits } from "discord.js";
import fs from "node:fs";
import "dotenv/config";
import { SeaworkConfig } from "./types/config";

export * from "./types/config"
export * from "./types/commands"

export const startDevServer = async () => {
    const { TOKEN } = process.env;

    if(!TOKEN) {
        if(!fs.existsSync(".env")) fs.writeFileSync(".env", "TOKEN=");
        console.log("Please provide TOKEN in .env\n");
        process.exit(1);
    };

    let vite = await createServer({
        server: {
            middlewareMode: true,
        },
        appType: "custom",
        clearScreen: false,
    });

    vite.bindCLIShortcuts({
        print: true,
        customShortcuts: [
            {
                key: "r",
                description: "restart",
                action: () => tryStart(),
            }
        ],
    })

    const loadConfigModule = async () => {
        let mod = await vite.ssrLoadModule("seawork.config.ts");
        return mod["default"] as SeaworkConfig;
    };

    let configModule = await loadConfigModule();

    console.log(configModule)

    let client: Client;

    let tryStart = async () => {
        configModule = await loadConfigModule();
        console.log(configModule)

        client = new Client({
            intents: [GatewayIntentBits.Guilds],
            ...configModule?.client,
        });

        client.on(Events.ClientReady, (readyClient) => console.log(`Logged in as ${readyClient.user.tag}!`));

        try {
            await client.login(TOKEN);
        } catch(e) {
            vite.config.logger.error(`Client login error`, { error: e, timestamp: true })
            console.log(e)
        }
    };

    vite.watcher.on("change", (full) => {
        let path = full.slice(vite.config.root.length + 1);
        console.log(path)
        if(path == "seawork.config.ts") tryStart();
    });

    tryStart();

    vite.config.logger.info("Dev started");
};


