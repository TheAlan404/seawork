import { Client, Interaction, MessagePayload, Routes } from "discord.js";
import { ConcurrentRoot } from "react-reconciler/constants";
import { Container, InternalNode } from "../reconciler/types";
import { reconciler } from "../reconciler";

export const createInteractionRenderer = (
    // client: Client,
    // interaction: Interaction,
    element: React.ReactNode,
) => {
    const sendOrEdit = (payload: any) => {
        console.log("PAYLOAD", payload);

        return;

        // client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
        //     body: {
        //         flags: 1<<15,
        //         components: [],
        //     }
        // })

        return;

        // if(interaction.isRepliable()) {
        //     if(interaction.replied) {
                
        //     } else {

        //     }
        // } else {
        //     console.log("Interaction not repliable!", interaction);
        // }
    };

    const onRender = () => {
        console.log("onRender")

        const root = container.node;

        console.log("CONTAINER", container);
        console.log("CHILDREN", container.node?.children);

        const toString = (node: InternalNode): string => {
            if(node.type == "#text") return node.props.text as string;
            return node.children.map(toString).join("");
        };

        const toComponent = (_node: InternalNode) => {
            type Intrinsics = React.JSX.IntrinsicElements;
            let node = _node as { [T in keyof Intrinsics]: { type: T; props: Intrinsics[T]; children: InternalNode[] } }[keyof Intrinsics]
            switch(node.type) {
                case "actionRow":
                    return {
                        type: 1,
                        components: node.children.map(toComponent),
                    };
                case "button":
                    let style = node.props.skuId ? 6 : (
                        node.props.url ? 5 : (["primary", "secondary", "success", "danger"].indexOf(node.props.style || "primary") + 1)
                    );

                    return {
                        type: 2,
                        style,
                        label: toString(node),
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
                        components: node.children.filter(x => x.type !== "accessory").map(toComponent),
                        accessory: toComponent(node.children.find(x => x.type == "accessory")),
                    };
                case "text":
                    return {
                        type: 10,
                        content: toString(node),
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
                        components: node.children.map(toComponent),
                        // accent_color: node.props.color,
                        spoiler: node.props.spoiler,
                    }
                default:
                    return null;
            }
        };

        if(!root) return console.log("Container empty");
        if(root.type !== "message") return console.log("Root is not a <message> component");
        let v2 = !!root.props.v2;
        let payload = {} as any;
        if(v2) {
            payload.flags = 1<<15;
            payload.components = root.children.map(toComponent);
        } else {
            payload.content = toString(root);
        }

        sendOrEdit(payload);
    };

    const onError = (e: Error) => {
        console.log("ERROR", e);
    };

    const container: Container = {
        node: null,
        onRender,
    };

    let root = reconciler.createContainer(
        container,
        ConcurrentRoot,
        null,
        false,
        null,
        "",
        onError,
        null
    )

    reconciler.updateContainer(element, root, null, () => {
        console.log("updated")
    })
};

