import { InternalCommandOption } from "./options";

export type InternalStore = {
    commands: Map<string, InternalCommand>;
};

export type InternalCommand = {
    path: string[];
    component?: React.ComponentType<any>;
    options?: InternalCommandOption[];
    details?: CommandDetails;
};

export type CommandDetails = {
    description?: string;
};
