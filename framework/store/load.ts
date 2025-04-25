import { join } from "node:path";
import { isModuleFile, removeExt, splitSegments, traverseAllFiles } from "./utils";
import { InternalCommand } from "./types";
import { store } from "./store";
import { hmrImport } from "./import";
import { renderers } from "../jsx/renderer";

const CommandsPath = join("bot", "commands");

export const loadCommands = async () => {
    console.log("Loading all commands");

    let allPaths = traverseAllFiles(CommandsPath);

    for (let path of allPaths) {
        let pathSegments = splitSegments(removeExt(path)).slice(2);
        let id = pathSegments.join(" ");

        let parent: Map<string, InternalCommand> = store.commands;

        let cmd: InternalCommand = {
            name: "",
            children: new Map(),
            id,
        };

        for (let i = 0; i < pathSegments.length; i++) {
            const segment = pathSegments[i];

            if (pathSegments.length-1 == i) {
                cmd.name = segment;

                hmrImport(path, (mod) => {
                    if (typeof mod.default == "function") cmd.component = mod.default;

                    renderers.updateCommand(cmd);
                    console.log("Command loaded: " + id);
                });

                parent.set(cmd.name, cmd);
                break;
            } else {
                if (!parent.has(segment)) parent.set(segment, {
                    name: segment,
                    children: new Map(),
                });
                parent = parent.get(segment)!.children!;
            }
        }
    }
};

import.meta.hot?.accept();
