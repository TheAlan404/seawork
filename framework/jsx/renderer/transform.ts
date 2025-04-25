import { Container, InternalNode } from "../reconciler/types";

export const transformContainerToMessagePayload = (container: Container) => {
    const root = container.node;

    if (!root) return console.log("Container empty");
    if (root.type !== "message") return console.log("Root is not a <message> component");
    let v2 = !!root.props.v2;
    let payload = {} as any;
    if (v2) {
        payload.flags = 1 << 15;
        payload.components = root.children.map(transformNodeToDiscordComponent);
    } else {
        payload.content = getNodeText(root);
    }

    return payload;
};

export type IntrinsicNode = {
    [K in keyof React.JSX.IntrinsicElements]: {
        type: K;
        props: React.JSX.IntrinsicElements[K];
        children: IntrinsicNode[];
    };
}[keyof React.JSX.IntrinsicElements];

export const getNodeText = (node: InternalNode): string => {
    if (node.type == "#text") return node.props.text as string;
    return node.children.map(getNodeText).join("");
};

export const transformNodeToDiscordComponent = (_node: InternalNode): any => {
    let node = _node as IntrinsicNode;
    switch (node.type) {
        case "actionRow":
            return {
                type: 1,
                components: node.children.map(transformNodeToDiscordComponent),
            };
        case "button":
            let style = node.props.skuId ? 6 : (
                node.props.url ? 5 : (["primary", "secondary", "success", "danger"].indexOf(node.props.style || "primary") + 1)
            );

            return {
                type: 2,
                style,
                label: getNodeText(node),
                custom_id: node.props.customId,
                sku_id: node.props.skuId,
                url: node.props.url,
                disabled: node.props.disabled,
            };
        case "select":
            return {
                type: {
                    string: 3,
                    user: 5,
                    role: 6,
                    mentionable: 7,
                    channel: 8,
                }[node.props.type],
                custom_id: node.props.customId,
                min_values: node.props.min,
                max_values: node.props.max,
                disabled: node.props.disabled,
                placeholder: node.props.placeholder,
                ...(node.props.type == "string" ? {
                    options: node.props.options,
                } : {}),
                ...(node.props.type == "user" || node.props.type == "role" ? {
                    default_values: node.props.value?.map(id => ({ id, type: node.props.type })),
                } : {}),
                ...(node.props.type == "mentionable" ? {
                    default_values: node.props.value,
                } : {}),
                ...(node.props.type == "channel" ? {
                    channel_types: node.props.channelTypes,
                    default_values: node.props.value?.map(id => ({ id, type: "channel" })),
                } : {}),
            };
        case "textInput":
            return {
                type: 4,
                custom_id: node.props.customId,
                style: node.props.paragraph ? 2 : 1,
                label: node.props.label,
                required: node.props.required,
                placeholder: node.props.placeholder,
                value: node.props.value,
                min_length: node.props.min,
                max_length: node.props.max,
            };
        case "section":
            return {
                type: 9,
                components: node.children.filter(x => x.type !== "accessory").map(transformNodeToDiscordComponent),
                accessory: transformNodeToDiscordComponent(node.children.find(x => x.type == "accessory")!),
            };
        case "text":
            return {
                type: 10,
                content: getNodeText(node),
            };
        case "thumbnail":
            return {
                type: 11,
                media: { url: node.props.media },
                description: node.props.description,
                spoiler: node.props.spoiler,
            };
        case "gallery":
            return {
                type: 12,
                items: node.props.items,
            };
        case "file":
            return {
                type: 13,
                file: { url: node.props.file },
                spoiler: node.props.spoiler,
            }
        case "seperator":
            return {
                type: 14,
                divider: node.props.divider,
                spacing: node.props.spacing == "lg" ? 2 : 1,
            }
        case "container":
            return {
                type: 17,
                components: node.children.map(transformNodeToDiscordComponent),
                // accent_color: node.props.color,
                spoiler: node.props.spoiler,
            }
        default:
            return null;
    }
}
