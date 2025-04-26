import "dotenv/config";
import config from "../config";
import { client } from "./client";
import { Events } from "discord.js";
import { loadCommands } from "./commands/store/load";
import { handleInteraction } from "./handlers/interaction";
import "./commands/publish/dev";
import "./commands/typegen/dev";

console.log("Starting Sea Framework...");

client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag} !`);
});

client.on(Events.InteractionCreate, handleInteraction);

if(config.login !== false) {
    let token = client.token ?? process.env.TOKEN;
    if(!!token) client.login(token);
    else console.log("Bot token missing!");
} else {
    console.log("Skipping login");
}

loadCommands();

// Keep event loop running in case we dont log in etc
setInterval(()=>{},1);
