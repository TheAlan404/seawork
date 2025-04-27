import { useEffect, useState } from "react";

export const options = [];

export const execute: Command.Execute = (ctx) => {
    console.log("Execute function works!");
    ctx.render();
};

export default function CounterCommand() {
    const [count, setCount] = useState(0);

    return (
        <message v2 ephemeral>
            <container>
                <text>
                    Counter: {count}
                </text>
                <row>
                    <button
                        onClick={() => setCount(c => c - 1)}
                    >
                        -1
                    </button>
                    <button
                        onClick={() => setCount(c => c + 1)}
                    >
                        +1
                    </button>
                </row>
                <separator divider />
                <row>
                    <button
                        onClick={(int) => {
                            // int.showModal()
                        }}
                    >
                        Open Modal
                    </button>
                </row>
            </container>
        </message>
    )
}
