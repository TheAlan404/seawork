import { join } from "node:path";
import { isModuleFile, noExtFilename, splitSegments, traverseAllFiles } from "./utils";
import { InternalCommand } from "./types";
import { store } from "./store";
import { importWithHotReload } from "./import";

const CommandsPath = join("bot", "commands");

export const loadCommands = async () => {
    console.log("Loading all commands");

    let allPaths = traverseAllFiles(CommandsPath);

    for(let path of allPaths) {
        let pathSegments = splitSegments(path).slice(2);

        let parent: Map<string, InternalCommand> = store.commands;

        let cmd: InternalCommand = {
            name: "",
            children: new Map(),
        };

        for(let segment of pathSegments) {
            if(isModuleFile(segment)) {
                cmd.name = noExtFilename(segment);

                let module = await importWithHotReload(path);
                console.log(module)
                if(typeof module.default == "function") cmd.component = module.default;

                console.log("Command loaded", cmd);
                parent.set(cmd.name, cmd);
                break;
            } else {
                if(!parent.has(segment)) parent.set(segment, {
                    name: segment,
                    children: new Map(),
                });
                parent = parent.get(segment)!.children!;
            }
        }
    }

    console.log(store);
};

loadCommands()

import.meta.hot?.accept();
