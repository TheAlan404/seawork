export type DJSXEventHandler<TValue, TInteraction> = TValue extends void ? (
    (interaction: TInteraction) => any
) : (
    (value: TValue, interaction: TInteraction) => any
);
