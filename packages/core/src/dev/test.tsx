import React from "react";
import { createInteractionRenderer } from "../../../../apps/test/framework/jsx/renderer/renderer"
import { ViteDevServer } from "vite";
import Pathe from "pathe";

export const runTest = async (vite: ViteDevServer) => {
    let module = await vite.ssrLoadModule("./bot/cmds/ping");

    let mount = () => {
        let Comp = module.default
        console.log("mounting", Comp)
        createInteractionRenderer(<Comp />)
    }

    vite.watcher.on("change", async (path) => {
        if(Pathe.basename(path) == "ping.tsx") module = await vite.ssrLoadModule("./bot/cmds/ping");
        console.log("Ping reloaded")
        // mount()
    })

    mount()
};
