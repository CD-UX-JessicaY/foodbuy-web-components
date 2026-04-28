import type { Components, JSX } from "../types/components";

interface FbRadioGroup extends Components.FbRadioGroup, HTMLElement {}
export const FbRadioGroup: {
    prototype: FbRadioGroup;
    new (): FbRadioGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
