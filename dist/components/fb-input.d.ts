import type { Components, JSX } from "../types/components";

interface FbInput extends Components.FbInput, HTMLElement {}
export const FbInput: {
    prototype: FbInput;
    new (): FbInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
