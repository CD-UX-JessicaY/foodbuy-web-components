import type { Components, JSX } from "../types/components";

interface FbTimeline extends Components.FbTimeline, HTMLElement {}
export const FbTimeline: {
    prototype: FbTimeline;
    new (): FbTimeline;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
