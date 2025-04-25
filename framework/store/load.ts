import { join } from "node:path";
import { traverseAllFiles } from "./utils";

const CommandsPath = join("bot", "commands");

export const loadCommands = () => {
    let traversed = traverseAllFiles(CommandsPath);
};
