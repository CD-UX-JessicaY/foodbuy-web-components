import type { Components, JSX } from "../types/components";

interface FbBadge extends Components.FbBadge, HTMLElement {}
export const FbBadge: {
    prototype: FbBadge;
    new (): FbBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
