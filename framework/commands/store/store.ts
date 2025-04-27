import EventEmitter from "node:events";
import { InternalCommand } from "../types";
import TypedEventEmitter from "typed-emitter";

export type StoreEvents = {
    loadingCommands: () => void;
    loadedCommands: () => void;
    commandUpdate: (cmd: InternalCommand) => void;
    commandAdd: (cmd: InternalCommand) => void;
};

export class Store extends (EventEmitter as new () => TypedEventEmitter<StoreEvents>) {
    commands: Map<string, InternalCommand> = new Map();

    hasCommand(path: string[]) {
        return this.commands.has(path.join(" "));
    }

    getCommand(path: string[]) {
        return this.commands.get(path.join(" "));
    }

    addCommand(cmd: InternalCommand) {
        const key = cmd.path.join(" ");
        const existed = this.commands.has(key);
        this.commands.set(key, cmd);
        if(existed) {
            this.emit("commandUpdate", cmd)
        } else {
            this.emit("commandAdd", cmd)
        };
    }
};

export const store = new Store();
