import { store } from "./commands/store/store";
import { renderers } from "./jsx/renderer/manager";

store.on("commandUpdate", (cmd) => {
    renderers.renderers.forEach(r => r.mount());
});
