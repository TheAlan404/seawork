import "dotenv/config";
import config from "../seawork.config";
import { client } from "./client";
import { Events } from "discord.js";
import { traverseAllFiles } from "./store/load";

client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag} !`);
});

if(config.login !== false) {
    let token = client.token ?? process.env.TOKEN;
    if(!!token) client.login(token);
    else console.log("Bot token missing!");
}

console.log(traverseAllFiles("bot"))
