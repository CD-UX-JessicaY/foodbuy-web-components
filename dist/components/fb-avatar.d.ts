import type { Components, JSX } from "../types/components";

interface FbAvatar extends Components.FbAvatar, HTMLElement {}
export const FbAvatar: {
    prototype: FbAvatar;
    new (): FbAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
