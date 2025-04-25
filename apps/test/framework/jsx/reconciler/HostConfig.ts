import { type HostConfig } from "react-reconciler";
import { DefaultEventPriority, DiscreteEventPriority } from "react-reconciler/constants";
import { Container, InternalNode } from "./types";

export type HostConfigProps = {
    Type: InternalNode["type"];
    Props: InternalNode["props"];
    Container: Container;
    Instance: InternalNode;
    TextInstance: InternalNode;
    SuspenseInstance: InternalNode;
    HydratableInstance: never;
    PublicInstance: null;
    HostContext: {};
    UpdatePayload: {};
    ChildSet: never;
    TimeoutHandle: number;
    NoTimeout: -1;
};

export const SeaworkHostConfig: HostConfig<
    HostConfigProps["Type"],
    HostConfigProps["Props"],
    HostConfigProps["Container"],
    HostConfigProps["Instance"],
    HostConfigProps["TextInstance"],
    HostConfigProps["SuspenseInstance"],
    HostConfigProps["HydratableInstance"],
    HostConfigProps["PublicInstance"],
    HostConfigProps["HostContext"],
    HostConfigProps["UpdatePayload"],
    HostConfigProps["ChildSet"],
    HostConfigProps["TimeoutHandle"],
    HostConfigProps["NoTimeout"]
> = {
    // Properties
    supportsMutation: true,
    supportsPersistence: false,
    supportsHydration: false,
    isPrimaryRenderer: false,

    // Container / Root
    appendChildToContainer: (container, child) => container.node = child,
    removeChildFromContainer: (container) => container.node = null,
    clearContainer: (container) => container.node = null,

    // Instance Creation
    createInstance: (type, props) => ({
        type,
        props,
        children: [],
    }),
    createTextInstance: (text) => ({
        type: "#text",
        props: { text },
        children: [],
    }),
    shouldSetTextContent: () => false,

    // Instance Updates
    // @ts-ignore
    commitUpdate: (node, type: string, prev: any, next:any, handle: any) => {
        let { children, ...props } = next;
        node.props = props;
    },
    commitTextUpdate: (node, oldText, newText) => {
        // console.log("commitTextUpdate", [node, oldText, newText])
        node.props.text = newText;
    },

    // Tree
    removeChild: (parent, child) => parent.children.splice(parent.children.indexOf(child), 1),
    appendInitialChild: (parent, child) => parent.children.push(child),
    appendChild: (parent, child) => parent.children.push(child),
    insertBefore: (parent, child, beforeChild) => parent.children.splice(parent.children.indexOf(beforeChild), 0, child),
    finalizeInitialChildren: () => false,

    // Suspense
    hideInstance: () => { },
    unhideInstance: () => { },

    // Host Contexts
    getRootHostContext: () => ({}),
    getChildHostContext: (ctx) => ctx,

    // Refs
    getPublicInstance: () => null,

    // ??? - TypeScript wants these to be defined
    getInstanceFromNode: () => null,
    beforeActiveInstanceBlur: () => null,
    afterActiveInstanceBlur: () => null,
    detachDeletedInstance: () => { },
    prepareScopeUpdate: () => null,
    getInstanceFromScope: () => null,
    // @ts-ignore
    maySuspendCommit: () => false,

    resetFormInstance() {},
    setCurrentUpdatePriority: (newPriority: number) => {},
    getCurrentUpdatePriority: () => DefaultEventPriority,
    resolveUpdatePriority: () => DefaultEventPriority,

    // Commit
    prepareForCommit: () => null,
    resetAfterCommit: (container) => {
        container.onRender?.();
    },
    preparePortalMount: () => { },
    prepareUpdate: () => ({}), // object tells react to always commit updates

    // Scheduling
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    supportsMicrotasks: true,
    scheduleMicrotask: queueMicrotask,
    getCurrentEventPriority: () => DefaultEventPriority,
};



