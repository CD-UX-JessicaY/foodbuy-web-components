import type { Components, JSX } from "../types/components";

interface FbTextarea extends Components.FbTextarea, HTMLElement {}
export const FbTextarea: {
    prototype: FbTextarea;
    new (): FbTextarea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
