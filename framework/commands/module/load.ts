import { InternalCommand } from "../types";
import { AnyCommandModule } from "./types";

export const loadCommandModule = (
    cmd: InternalCommand,
    mod: AnyCommandModule,
) => {
    if (typeof mod.default == "function") cmd.component = mod.default;
    if(Array.isArray(mod.options)) cmd.options = mod.options;
    cmd.details = mod.details;
};
