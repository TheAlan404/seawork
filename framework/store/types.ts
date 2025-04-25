export type InternalCommand = {
    name: string;
    children?: Map<string, InternalCommand>;
    component?: React.ComponentType<any>;
};
