import type { Components, JSX } from "../types/components";

interface FbCheckbox extends Components.FbCheckbox, HTMLElement {}
export const FbCheckbox: {
    prototype: FbCheckbox;
    new (): FbCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
