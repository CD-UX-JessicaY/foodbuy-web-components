import type { Components, JSX } from "../types/components";

interface FbSkeleton extends Components.FbSkeleton, HTMLElement {}
export const FbSkeleton: {
    prototype: FbSkeleton;
    new (): FbSkeleton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
