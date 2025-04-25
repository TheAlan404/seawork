export type InternalStore = {
    commands: Map<string, InternalCommand>;
};

export type InternalCommand = {
    name: string;
    children?: Map<string, InternalCommand>;
    component?: React.ComponentType<any>;
};
