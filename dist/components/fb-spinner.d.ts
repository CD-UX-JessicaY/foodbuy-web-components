import type { Components, JSX } from "../types/components";

interface FbSpinner extends Components.FbSpinner, HTMLElement {}
export const FbSpinner: {
    prototype: FbSpinner;
    new (): FbSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
