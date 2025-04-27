import { join } from "node:path";
import { removeExt, splitSegments, traverseAllFiles } from "./utils";
import { InternalCommand } from "../types";
import { store } from "./store";
import { hmrImport } from "../../import";
import { loadCommandModule } from "../module/load";

const CommandsPath = join("bot", "commands");

export const loadCommands = async () => {
    store.commands.clear();

    console.log("Loading all commands");

    let allPaths = traverseAllFiles(CommandsPath);

    let promises: Promise<void>[] = [];

    for (let modulePath of allPaths) {
        let path = splitSegments(removeExt(modulePath)).slice(2);
        let id = path.join(" ");

        let cmd: InternalCommand = {
            path,
        };
        
        promises.push(hmrImport(modulePath, (mod) => {
            loadCommandModule(cmd, mod);
            store.addCommand(cmd);
            console.log("Command loaded: " + id);
        }));
    }

    return await Promise.all(promises);
};

import.meta.hot?.accept();
