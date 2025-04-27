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
        type,
    },
}: Command.ComponentProps) {
    return (
        <message v2 ephemeral>
            <container>
                <Tabs initialTab="a">
                    {type}
                    
                    <Tabs.Buttons
                        data={["a", "b", "c"]}
                    />

                    <Tabs.Tab value="a">
                        <text>
                            # Tab A
                            {"\n\n"}
                            very cool tab btw
                        </text>
                    </Tabs.Tab>
                    <Tabs.Tab value="b">
                        <text>b</text>
                    </Tabs.Tab>
                    <Tabs.Tab value="c">
                        <text>c</text>
                    </Tabs.Tab>
                </Tabs>
            </container>
        </message>
    )
}
