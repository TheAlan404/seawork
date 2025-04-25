import { InternalCommand, InternalStore } from "./types";

export const store: InternalStore = {
    commands: new Map(),
};

export const findCommandById = (id: string) => {
    let flattened: InternalCommand[] = []

    let add = (x: InternalCommand) => {
        flattened.push(x);
        for(let c of x.children?.values() || []) add(c);
    };
    
    for(let x of store.commands.values()) add(x);

    return flattened.find(x => x.id == id);
};
