import type { Components, JSX } from "../types/components";

interface FbResizableGroup extends Components.FbResizableGroup, HTMLElement {}
export const FbResizableGroup: {
    prototype: FbResizableGroup;
    new (): FbResizableGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
