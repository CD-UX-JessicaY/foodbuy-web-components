import type { Components, JSX } from "../types/components";

interface FbSelect extends Components.FbSelect, HTMLElement {}
export const FbSelect: {
    prototype: FbSelect;
    new (): FbSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
