import { join } from "node:path";
import { removeExt, splitSegments, traverseAllFiles } from "./utils";
import { InternalCommand } from "../types";
import { store } from "./store";
import { hmrImport } from "../../import";
import { AnyCommandModule } from "../module/types";

const CommandsPath = join("bot", "commands");

export const loadCommands = async () => {
    store.commands.clear();

    console.log("Loading all commands");

    let allPaths = traverseAllFiles(CommandsPath);

    for (let modulePath of allPaths) {
        let path = splitSegments(removeExt(modulePath)).slice(2);
        let id = path.join(" ");

        let cmd: InternalCommand = {
            path,
        };
        
        hmrImport(modulePath, (mod) => {
            loadCommandModule(cmd, mod);
            store.addCommand(cmd);
            console.log("Command loaded: " + id);
        });
    }
};

export const loadCommandModule = (
    cmd: InternalCommand,
    mod: AnyCommandModule,
) => {
    if (typeof mod.default == "function") cmd.component = mod.default;
};

import.meta.hot?.accept();
