import type { Components, JSX } from "../types/components";

interface FbPagination extends Components.FbPagination, HTMLElement {}
export const FbPagination: {
    prototype: FbPagination;
    new (): FbPagination;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
