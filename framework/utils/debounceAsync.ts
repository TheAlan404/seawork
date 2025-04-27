export function debounceAsync<F extends (this: This, ...args: Args) => Promise<any>, This, Args extends any[]>(fn: F, ms = 300): F {
    let timeoutId: NodeJS.Timeout;
    let executing = false;
    let next: [This, Args] | undefined;

    return function (this: This, ...args: Args) {
        if (executing) {
            next = [this, args];
            return;
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(async function execute(thisArg: This, args: Args) {
            executing = true;
            await fn.apply(thisArg, args);
            executing = false;

            if (next) {
                timeoutId = setTimeout(execute, ms, ...next);
                next = undefined;
            }
        }, ms, this, args);
    } as F;
}
