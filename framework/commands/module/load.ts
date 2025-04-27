import { AnyCommandModule, InternalCommand } from "../types";

export const loadCommandModule = (
    cmd: InternalCommand,
    mod: AnyCommandModule,
) => {
    if("options" in mod && !Array.isArray(mod.options))
        console.log("[error] 'export options' is not an array!");

    Object.assign(cmd, mod);
};
