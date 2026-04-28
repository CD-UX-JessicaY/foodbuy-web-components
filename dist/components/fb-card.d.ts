import type { Components, JSX } from "../types/components";

interface FbCard extends Components.FbCard, HTMLElement {}
export const FbCard: {
    prototype: FbCard;
    new (): FbCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
