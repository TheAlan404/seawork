import { number } from "#core/commands/options/index.ts";
import { useState } from "react"

export const options = [
    number("min", {}),
    number("max", {}),
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
                <actionRow>
                    <select
                        type="user"
                        onSelect={(v) => setState(v)}
                        placeholder="User Select"
                        {...props}
                    />
                </actionRow>
                <actionRow>
                    <select
                        type="channel"
                        onSelect={(v) => setState(v)}
                        placeholder="Channel Select"
                        {...props}
                    />
                </actionRow>
                <actionRow>
                    <select
                        type="mentionable"
                        onSelect={(v) => setState(v)}
                        placeholder="Mentionable Select"
                        {...props}
                    />
                </actionRow>
                <actionRow>
                    <select
                        type="role"
                        onSelect={(v) => setState(v)}
                        placeholder="Role Select"
                        {...props}
                    />
                </actionRow>
                <text>
                    thank you come again :3
                </text>
            </container>
        </message>
    )
}
