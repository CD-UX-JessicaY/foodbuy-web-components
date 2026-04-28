import type { Components, JSX } from "../types/components";

interface FbAlert extends Components.FbAlert, HTMLElement {}
export const FbAlert: {
    prototype: FbAlert;
    new (): FbAlert;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
