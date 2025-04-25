import "dotenv/config";
import config from "../seawork.config";
import { client } from "./client";
import { Events } from "discord.js";
import { loadCommands } from "./store/load";

console.log("Starting Sea Framework...");

client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag} !`);
});

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

import.meta.hot?.accept();
