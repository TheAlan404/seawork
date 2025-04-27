import { useState } from "react"

export default function Test() {
    const [state, setState] = useState<any>(null);

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
                    />
                </actionRow>
                <actionRow>
                    <select
                        type="channel"
                        onSelect={(v) => setState(v)}
                        placeholder="Channel Select"
                    />
                </actionRow>
                <actionRow>
                    <select
                        type="mentionable"
                        onSelect={(v) => setState(v)}
                        placeholder="Mentionable Select"
                    />
                </actionRow>
                <actionRow>
                    <select
                        type="role"
                        onSelect={(v) => setState(v)}
                        placeholder="Role Select"
                    />
                </actionRow>
                <text>
                    thank you come again :3
                </text>
            </container>
        </message>
    )
}
