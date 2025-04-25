import { APIApplicationCommandStringOption } from "discord-api-types/v10";
import { ApplicationCommandOptionType } from "discord.js";



export const string = (name: string, {

}: {

} = {}) => {
    return {
        type: ApplicationCommandOptionType.String,
        name,
    };
};

