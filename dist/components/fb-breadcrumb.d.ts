import type { Components, JSX } from "../types/components";

interface FbBreadcrumb extends Components.FbBreadcrumb, HTMLElement {}
export const FbBreadcrumb: {
    prototype: FbBreadcrumb;
    new (): FbBreadcrumb;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
