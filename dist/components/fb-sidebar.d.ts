import type { Components, JSX } from "../types/components";

interface FbSidebar extends Components.FbSidebar, HTMLElement {}
export const FbSidebar: {
    prototype: FbSidebar;
    new (): FbSidebar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
