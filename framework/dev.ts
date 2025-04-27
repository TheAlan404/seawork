import { store } from "./commands/store/store";
import { renderers } from "./jsx/renderer/manager";

store.on("commandUpdate", (cmd) => {
    for(let inst of renderers.instances) {
        inst.mount();
    }
});
