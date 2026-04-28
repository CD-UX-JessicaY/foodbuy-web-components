import type { Components, JSX } from "../types/components";

interface FbToast extends Components.FbToast, HTMLElement {}
export const FbToast: {
    prototype: FbToast;
    new (): FbToast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
