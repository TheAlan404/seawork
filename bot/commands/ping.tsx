import { Tabs } from "../components/Tabs";

export default function TabsExampleCommand() {
    return (
        <message v2 ephemeral>
            <container>
                <Tabs initialTab="a">
                    <Tabs.Buttons
                        data={["a", "b", "c"]}
                    />

                    <Tabs.Tab value="a">
                        <text>
                            # Tab A

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
