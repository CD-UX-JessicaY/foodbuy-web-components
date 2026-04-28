import type { Components, JSX } from "../types/components";

interface FbSeparator extends Components.FbSeparator, HTMLElement {}
export const FbSeparator: {
    prototype: FbSeparator;
    new (): FbSeparator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
