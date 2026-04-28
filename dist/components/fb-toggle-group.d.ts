import type { Components, JSX } from "../types/components";

interface FbToggleGroup extends Components.FbToggleGroup, HTMLElement {}
export const FbToggleGroup: {
    prototype: FbToggleGroup;
    new (): FbToggleGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
