import { integer } from "#core/commands/options/index.ts";
import { useState } from "react"

export const options = [
    integer("min", {}),
    integer("max", {}),
];

export default function Test({
    options: { min, max },
}: Command.ComponentProps) {
    const [state, setState] = useState<any>(null);

    const props = {
        min: min || undefined,
        max: max || undefined,
    };

    return (
        <message v2 ephemeral>
            <container>
                <text>
                    # Selects Tester{"\n"}
                    ```js{"\n"}
                    {JSON.stringify(state, null, 2)}{"\n"}
                    ```{"\n"}
                </text>
                <row>
                    <select
                        type="user"
                        onSelect={(v) => setState(v)}
                        placeholder="User Select"
                        {...props}
                    />
                </row>
                <row>
                    <select
                        type="channel"
                        onSelect={(v) => setState(v)}
                        placeholder="Channel Select"
                        {...props}
                    />
                </row>
                <row>
                    <select
                        type="mentionable"
                        onSelect={(v) => setState(v)}
                        placeholder="Mentionable Select"
                        {...props}
                    />
                </row>
                <row>
                    <select
                        type="role"
                        onSelect={(v) => setState(v)}
                        placeholder="Role Select"
                        {...props}
                    />
                </row>
                <text>
                    thank you come again :3
                </text>
            </container>
        </message>
    )
}
