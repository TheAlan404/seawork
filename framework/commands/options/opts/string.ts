import { BaseCommandOption, CommandOptionAutocomplete, CommandOptionChoice } from "../base";

export interface BaseCommandStringOption extends BaseCommandOption {
    min?: number;
    max?: number;
};

export interface CommandStringDefaultOption extends BaseCommandStringOption {
    choices?: CommandOptionChoice<string>[];
};

export interface CommandStringAutocompleteOption extends BaseCommandStringOption {
    autocomplete: CommandOptionAutocomplete<string>;
};

export type CommandStringOption = CommandStringDefaultOption | CommandStringAutocompleteOption;
