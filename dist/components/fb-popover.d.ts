import type { Components, JSX } from "../types/components";

interface FbPopover extends Components.FbPopover, HTMLElement {}
export const FbPopover: {
    prototype: FbPopover;
    new (): FbPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
