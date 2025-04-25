import { SeaworkElements } from "./elements";

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements extends SeaworkElements {}
        }
    }
}


