// nvm nodejs has this BRUH

import { isDeepStrictEqual } from "node:util";
isDeepStrictEqual;

// TREATS NULL === UNDEFINED !!!
export const deepEquals = (a: any, b: any) => {
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEquals(a[i], b[i])) return false;
        }
    }

    // mmm
    // i did this bcuz this is only used for comparing cache files and we simply dont need to care
    // (typeof null == "object") btw :skull:
    if (a === null && b === undefined) return true;
    if (a === undefined && b === null) return true;

    if(typeof a == "object" && typeof b == "object") {
        let aKeys = new Set(Object.keys(a));
        let bKeys = new Set(Object.keys(b));

        if(aKeys.size !== bKeys.size || [...aKeys].every(k => bKeys.has(k))) return false;

        for(let k of aKeys) {
            if(!deepEquals(a[k], b[k])) return false;
        }

        return true;
    }

    return a === b;
};



import.meta.hot?.accept();
