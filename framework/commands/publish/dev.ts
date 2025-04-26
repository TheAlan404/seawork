import { store } from "../store/store";

store.on("commandUpdate", () => {
    devPublishCommands();
});

export const devPublishCommands = () => {
    console.log("Hook ran");
};
