import { useEffect, useState } from "react";

export const options = () => [];

export default function PingCommand() {
    const [state, setState] = useState(0);

    // useEffect(() => {
    //     let i = setInterval(() => {
    //         setState(s => s+2)
    //     }, 1000)
    //     return () => clearInterval(i)
    // }, [])

    return (
        <message v2>
            <container>
                <text>MEOW</text>
                <text>MEOW</text>
                <actionRow>
                    <button
                        customId="a"
                    >
                        mrow
                    </button>
                    <button
                        customId="b"
                        style="secondary"
                    >
                        mrrp
                    </button>
                </actionRow>
            </container>
        </message>
    )
}
