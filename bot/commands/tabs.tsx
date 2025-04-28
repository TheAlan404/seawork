import { string } from "#core/commands/options/index.ts";
import { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";

export const options = [
    string("type", {
        choices: [
            { name: "Buttons", value: "buttons" },
            { name: "Select", value: "select" },
        ],
    })
];

export const execute: Command.Execute = (ctx) => {
    console.log("Execute function works!");
    ctx.render();
};

export default function TabsExampleCommand({
    options: {
        type = "buttons",
    },
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
                            # Tab A{"\n"}
                            {"\n"}
                            very cool tab btw
                        </text>
                    </Tabs.Panel>
                    <Tabs.Panel value="b">
                        <text>
                            # Tab B{"\n"}
                            {"\n"}
                            also very epic
                        </text>
                    </Tabs.Panel>
                    <Tabs.Panel value="c">
                        <text>c</text>
                    </Tabs.Panel>
                </Tabs>

                <row>
                    <button style="danger">
                        Button that does nothing
                    </button>
                </row>
            </container>
        </message>
    )
}
