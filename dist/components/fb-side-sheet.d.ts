import type { Components, JSX } from "../types/components";

interface FbSideSheet extends Components.FbSideSheet, HTMLElement {}
export const FbSideSheet: {
    prototype: FbSideSheet;
    new (): FbSideSheet;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
