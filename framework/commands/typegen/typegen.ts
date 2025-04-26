import { InternalCommand } from "../types";

export const typegenHeader = () => [
    `import * as T from "#core/commands/module/types.ts";`,
].join("\n");

export const typegenCommand = (cmd: InternalCommand) => {
    return [
        `declare module "${["bot", "commands", ...cmd.path].join("/")}" {`,
        indented([
            `namespace Command {`,
            indented([
                `type Options = string[];`,
                `type ComponentProps = T.AnyCommandComponentProps;`,
            ]),
            `}`,
        ]),

        `}`,
    ].join("\n");
};

export const indented = (lines: string[]) => lines
    .join("\n")
    .split("\n")
    .map(x => "\t"+x)
    .join("\n")
