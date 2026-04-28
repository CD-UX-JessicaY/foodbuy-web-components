import type { Components, JSX } from "../types/components";

interface FbSwitch extends Components.FbSwitch, HTMLElement {}
export const FbSwitch: {
    prototype: FbSwitch;
    new (): FbSwitch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
