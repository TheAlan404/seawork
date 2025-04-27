import { BaseCommandOption, CommandOptionAutocomplete, CommandOptionChoice } from "../base";

export type CommandNumberLikeOption = CommandNumberLikeDefaultOption | CommandNumberLikeAutocompleteOption;

export interface CommandNumberLikeDefaultOption extends BaseCommandOption {
    choices?: CommandOptionChoice<number>[];
    min?: number;
    max?: number;
};

export interface CommandNumberLikeAutocompleteOption extends BaseCommandOption {
    autocomplete: CommandOptionAutocomplete<number>;
};
