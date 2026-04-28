import type { Components, JSX } from "../types/components";

interface FbCombobox extends Components.FbCombobox, HTMLElement {}
export const FbCombobox: {
    prototype: FbCombobox;
    new (): FbCombobox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
