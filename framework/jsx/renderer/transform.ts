import { v4 } from "uuid";
import { Container, InternalNode } from "../reconciler/types";
import { APIChannelSelectComponent, APIMentionableSelectComponent, APIMessageComponent, APIRoleSelectComponent, APIUserSelectComponent, APIStringSelectComponent, ComponentType } from "discord-api-types/v10";
import { APIMessage, BaseMessageOptions, ButtonInteraction, resolveColor } from "discord.js";
import { EventHandler } from "../intrinsics/elements";
import { RendererEventContainer } from "./events";

export type InstrinsicNodesMap = {
    [K in keyof React.JSX.IntrinsicElements]: {
        type: K;
        props: React.JSX.IntrinsicElements[K];
        children: IntrinsicNode[];
    };
};

export type IntrinsicNode = InstrinsicNodesMap[keyof React.JSX.IntrinsicElements];

type AllSelectComponents = APIStringSelectComponent | APIUserSelectComponent | APIRoleSelectComponent | APIChannelSelectComponent | APIMentionableSelectComponent;

export type PayloadOutput = BaseMessageOptions & {
    v2: boolean;
    ephemeral: boolean;
};

export class PayloadTransformer {
    events: RendererEventContainer;

    constructor(events: RendererEventContainer) {
        this.events = events;
    }

    createCustomId() {
        return `auto:${v4()}`;
    }

    toMessagePayload(root: InternalNode | null) {
        if (!root) return console.log("Container empty");
        if (root.type !== "message") return console.log("Root is not a <message> component");

        let components = this.toDiscordComponentsArray(root.children);

        let v2 = !!root.props.v2;
        let payload: PayloadOutput = {
            v2,
            ephemeral: !!root.props.ephemeral,
            components,
            content: v2 ? undefined : this.toText(root),
        };

        return payload;
    }

    toText(node: InternalNode): string {
        console.log("toText call", node)
        if (node.type == "#text") return node.props.text as string;
        return node.children.map(this.toText.bind(this)).join("");
    }

    toDiscordComponentsArray(children: InternalNode[]) {
        return children.map(this.toDiscordComponent.bind(this)).filter(x => x !== null);
    }

    toDiscordComponent(_node: InternalNode): APIMessageComponent | null {
        let node = _node as IntrinsicNode;

        switch (node.type) {
            case "actionRow":
                return {
                    type: ComponentType.ActionRow,
                    components: this.toDiscordComponentsArray(node.children) as any,
                };
            case "button":
                return this.toDiscordButtonComponent(node);
            case "select":
                return this.toDiscordSelectComponent(node);
            case "textInput":
                return this.toDiscordTextInputComponent(node);
            case "section":
                const nonAccessory = node.children.filter(x => x.type !== "accessory");
                const accessoryNode = node.children.find(x => x.type == "accessory")?.children[0];

                if(!accessoryNode) return null;
                const accessory = this.toDiscordComponent(accessoryNode);
                if(!accessory) return null;

                return {
                    type: ComponentType.Section,
                    components: this.toDiscordComponentsArray(nonAccessory) as any,
                    accessory: accessory as any,
                };
            case "text":
                return {
                    type: 10,
                    content: this.toText(node),
                };
            case "thumbnail":
                if(!node.props.media) return null;

                return {
                    type: 11,
                    media: { url: node.props.media },
                    description: node.props.description,
                    spoiler: node.props.spoiler,
                };
            case "gallery":
                if(!node.props.items) return null;

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
                    components: this.toDiscordComponentsArray(node.children) as any,
                    accent_color: node.props.color ? resolveColor(node.props.color) : undefined,
                    spoiler: node.props.spoiler,
                }
            default:
                return null;
        }
    }

    toDiscordButtonComponent(node: InstrinsicNodesMap["button"]) {
        let style = "skuId" in node.props ? 6 : (
            "url" in node.props ? 5 : (["primary", "secondary", "success", "danger"].indexOf(node.props.style || "primary") + 1)
        );

        const custom_id = node.props.customId || this.createCustomId();
        this.events.registerButtonOnClick(custom_id, (node.props as any).onClick);

        return {
            type: 2,
            style,
            label: this.toText(node),
            custom_id,
            sku_id: (node.props as any).skuId,
            url: (node.props as any).url,
            disabled: node.props.disabled,
        };
    }

    toDiscordSelectComponent(node: InstrinsicNodesMap["select"]): AllSelectComponents {
        const custom_id = node.props.customId || this.createCustomId();
        
        return {
            type: {
                string: 3,
                user: 5,
                role: 6,
                mentionable: 7,
                channel: 8,
            }[node.props.type],
            custom_id,
            min_values: node.props.min,
            max_values: node.props.max,
            disabled: node.props.disabled,
            placeholder: node.props.placeholder,
            ...(node.props.type == "string" ? {
                options: node.props.options.map(option => ({
                    ...option,
                    default: (node.props.value as string[] | undefined)?.includes(option.value),
                })),
            } : {}),
            ...(node.props.type == "user" || node.props.type == "role" ? {
                default_values: node.props.value?.map(id => ({ id, type: node.props.type })) as any,
            } : {}),
            ...(node.props.type == "mentionable" ? {
                default_values: node.props.value as any,
            } : {}),
            ...(node.props.type == "channel" ? {
                channel_types: node.props.channelTypes,
                default_values: node.props.value?.map(id => ({ id, type: "channel" })) as any,
            } : {}),
        };
    }

    toDiscordTextInputComponent(node: InstrinsicNodesMap["textInput"]) {
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
    }
};
