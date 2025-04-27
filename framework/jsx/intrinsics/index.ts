import type { SeaworkElements } from "./elements";

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements extends SeaworkElements {}
            interface IntrinsicAttributes {
                key?: Key | null | undefined;
            }
        }
    }
}


