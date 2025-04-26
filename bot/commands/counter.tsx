import { useEffect, useState } from "react";

export const options = () => [];

export default function CounterCommand() {
    const [count, setCount] = useState(0);

    return (
        <message v2>
            <container>
                <text>
                    Counter: {count}
                </text>
                <actionRow>
                    <button
                        onClick={() => setCount(c => c-1)}
                    >
                        -1
                    </button>
                    <button
                        onClick={() => setCount(c => c+1)}
                    >
                        +1
                    </button>
                </actionRow>
            </container>
        </message>
    )
}
