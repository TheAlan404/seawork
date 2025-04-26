import "dotenv/config";
import { REST } from "discord.js";
import { createCommandsJSON } from "./generate";
import config from "../../../config";
import { publishCommands } from "./publish";
import { loadCommands } from "../store/load";

async function main() {
    let token = process.env.TOKEN;
    if(!token) return console.log("Missing token");

    console.log("[publish] Loading commands...");
    await loadCommands();
    console.log("[publish] All commands loaded");

    const rest = new REST().setToken(token);

    console.log("[publish] Publishing...");
    const body = createCommandsJSON();
    console.log(body);
    await publishCommands(rest, body, config.guildId);
    console.log("[publish] Published!");
}

main();





