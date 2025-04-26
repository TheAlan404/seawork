import { store } from "../store/store";

store.on("commandUpdate", () => {
    devTypeGen();
});

export const devTypeGen = () => {
    // console.log("Hook ran");
};

import.meta.hot?.accept();
