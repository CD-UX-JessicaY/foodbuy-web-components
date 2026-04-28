import type { Components, JSX } from "../types/components";

interface FbButton extends Components.FbButton, HTMLElement {}
export const FbButton: {
    prototype: FbButton;
    new (): FbButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
