import type { Components, JSX } from "../types/components";

interface FbChip extends Components.FbChip, HTMLElement {}
export const FbChip: {
    prototype: FbChip;
    new (): FbChip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
