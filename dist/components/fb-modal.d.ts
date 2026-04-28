import type { Components, JSX } from "../types/components";

interface FbModal extends Components.FbModal, HTMLElement {}
export const FbModal: {
    prototype: FbModal;
    new (): FbModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
