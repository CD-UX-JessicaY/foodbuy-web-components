import type { Components, JSX } from "../types/components";

interface FbTooltip extends Components.FbTooltip, HTMLElement {}
export const FbTooltip: {
    prototype: FbTooltip;
    new (): FbTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
