import Reconciler, { OpaqueRoot } from "react-reconciler";
import { SeaworkHostConfig } from "./HostConfig";
import { Container } from "./types";
import { ConcurrentRoot } from "react-reconciler/constants.js";
import EventEmitter from "node:events";
import TypedEmitter from "typed-emitter"
import { createElement, Fragment } from "react";

export const reconciler = Reconciler(SeaworkHostConfig);

export type SeaworkReactRendererEvents = {
    render: (container: Container) => void;
    renderError: (e: Error) => void;
    containerUpdated: () => void;
};

export class SeaworkReactRenderer extends (EventEmitter as new () => TypedEmitter<SeaworkReactRendererEvents>) {
    container: Container;
    root: OpaqueRoot;

    constructor() {
        super();

        this.container = {
            node: null,
            onRender: () => this.emit("render", this.container),
        };

        this.root = reconciler.createContainer(
            this.container,
            ConcurrentRoot,
            null,
            false,
            null,
            "",
            (e) => this.emit("renderError", e),
            null
        );
    }

    setRenderedNode(node: React.ReactNode) {
        reconciler.updateContainer(node, this.root, null, () => {
            this.emit("containerUpdated");
        });
    }

    stop() {
        // ?
        this.setRenderedNode(createElement(Fragment));
    }
};
