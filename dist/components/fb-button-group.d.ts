import type { Components, JSX } from "../types/components";

interface FbButtonGroup extends Components.FbButtonGroup, HTMLElement {}
export const FbButtonGroup: {
    prototype: FbButtonGroup;
    new (): FbButtonGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
