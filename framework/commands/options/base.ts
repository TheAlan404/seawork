export interface BaseCommandOption {
    description?: string;
    required?: boolean;
};

export interface CommandOptionChoice<T> {
    name: string;
    value: T;
}

// TODO: arg types
export type CommandOptionAutocomplete<T> = () => Promise<T>;
