import { string } from "#core/commands/options/index.ts";
import { Tabs } from "../components/Tabs";

export const options = [
    string("type", {
        choices: [
            { name: "Buttons", value: "buttons" },
            { name: "Select", value: "select" },
        ],
    })
];

export default function TabsExampleCommand({
    options: {
        type = "select",
    } = { type: "select" },
}: Command.ComponentProps) {
    return (
        <message v2 ephemeral>
            <container>
                <Tabs initialTab="a">
                    {type == "buttons" ? (
                        <Tabs.Buttons
                            data={["a", "b", "c"]}
                        />
                    ) : (
                        <Tabs.Select
                            data={["a", "b", "c"]}
                        />
                    )}

                    <Tabs.Panel value="a">
                        <text>
                            # Tab A
                            {"\n\n"}
                            very cool tab btw
                        </text>
                    </Tabs.Panel>
                    <Tabs.Panel value="b">
                        <text>b</text>
                    </Tabs.Panel>
                    <Tabs.Panel value="c">
                        <text>c</text>
                    </Tabs.Panel>
                </Tabs>
            </container>
        </message>
    )
}
