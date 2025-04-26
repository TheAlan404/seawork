import EventEmitter from "node:events";
import { InternalCommand, InternalStore } from "../types";
import TypedEventEmitter from "typed-emitter";

export type StoreEvents = {
    commandUpdate: (cmd: InternalCommand) => void;
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
        this.commands.set(cmd.path.join(" "), cmd);
        this.emit("commandUpdate", cmd);
    }
};

export const store = new Store();
