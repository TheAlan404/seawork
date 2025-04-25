import "dotenv/config";
import type { } from "dynohot";
import { Client } from "discord.js";
import { SeaworkConfig } from "../types/config";
import chokidar, { FSWatcher } from "chokidar";
import { filename as getFilename } from "pathe/utils";
import { sep } from "node:path";

type SeaworkCommand = {
    name: string;
    children: Map<string, SeaworkCommand>;
    component?: React.ComponentType<any>;
}

class SeaworkDevServer {
    config: SeaworkConfig;
    client: Client;
    watcher: FSWatcher;

    commands: Map<string, SeaworkCommand> = new Map();

    constructor() {}

    async load() {
        console.log("Starting...");
        await this.loadConfig();
        this.initializeWatcher();
        this.initializeClient();
        console.log("Started");
    }

    async loadConfig() {
        const path = "seawork.config.ts";
        try {
            this.config = await import(path).catch(console.log);
        } catch(e) {
            console.log(e)
        }
        console.log("Config loaded", this.config);
    }

    initializeWatcher() {
        this.watcher = chokidar.watch([
            "."
        ], {
            ignored: [".git", "node_modules", ".seawork"],
            cwd: process.cwd(),
        });

        this.watcher.on("all", (ev, path) => {
            console.log(">> ", ev, path)
        })

        this.watcher.on("change", async (path) => {
            await this.importFile(path);
        });
        this.watcher.on("add", async (path) => {
            await this.importFile(path);
        });
    }

    async importFile(path: string) {
        let segments = path.split(sep);
        console.log(segments)

        if (segments[0] == "bot") {
            if (segments[1] == "commands") {
                let hasChild = !!segments[3];
                if (hasChild) {

                } else {
                    let commandName = getFilename(segments[2]);
                    let module = await import(path);
                    let command = {
                        name: commandName,
                        children: new Map(),
                        component: module.default as any,
                    };
                    this.commands.set(command.name, command)
                    console.log("Imported command", command)
                }
            }
        }
    }

    initializeClient() {
        this.client = new Client({
            intents: ["Guilds"],
            ...this.config?.client,
        })
    }
}

let s = new SeaworkDevServer();

export const startDevServer = async () => {
    console.log("Starting dev server...")

    await s.load();

    // let vite = await createServer({
    //     server: {
    //         middlewareMode: true,
    //     },
    //     appType: "custom",
    //     clearScreen: false,
    // });

    // const loadConfigModule = async () => {
    //     let mod = await vite.ssrLoadModule("seawork.config.ts");
    //     return mod["default"] as SeaworkConfig;
    // };

    // let configModule = await loadConfigModule();

    // const initializeClient = () => new Client({
    //     intents: [GatewayIntentBits.Guilds],
    //     ...configModule?.client,
    // });

    // let client = initializeClient();

    // runTest(vite)

    // let interactionCreateHandler = (interaction: Interaction) => {
    //     if(interaction.isChatInputCommand()) {
    //         // let Component = pingModule.default as React.ComponentType;

    //     }
    // };

    // let tryStart = async () => {
    //     configModule = await loadConfigModule();
    //     client = initializeClient();

    //     client.on(Events.ClientReady, async (readyClient) => {
    //         console.log(`Logged in as ${readyClient.user.tag}!`);
    //         // await client.rest.put(Routes.applicationGuildCommands(configModule.clientId, "1197520507617153064"), {
    //         //     body: [
    //         //         { name: "ping", description: "mrow" }
    //         //     ]
    //         // })
    //         // console.log("pushed commands")
    //     })

    //     client.on(Events.InteractionCreate, (e) => {

    //     });

    //     const TOKEN = client.token || process.env.TOKEN;

    //     if(!TOKEN) {
    //         if(!existsSync(".env")) writeFileSync(".env", "TOKEN=");
    //         console.log("Bot token not found - Please provide TOKEN in .env\n");
    //         return;
    //     }

    //     try {
    //         // await client.login(TOKEN);
    //     } catch(e) {
    //         console.log(e)
    //     }


    // };

    // vite.watcher.on("change", (full) => {
    //     console.log("||| " + full);
    //     if(!full.startsWith(vite.config.root)) return;
    //     let path = full.slice(vite.config.root.length + 1);
    //     console.log(path)
    //     if(path == "seawork.config.ts") tryStart();
    // });

    // console.log("Starting...")

    // tryStart();
};


