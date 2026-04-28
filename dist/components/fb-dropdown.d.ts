import type { Components, JSX } from "../types/components";

interface FbDropdown extends Components.FbDropdown, HTMLElement {}
export const FbDropdown: {
    prototype: FbDropdown;
    new (): FbDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
