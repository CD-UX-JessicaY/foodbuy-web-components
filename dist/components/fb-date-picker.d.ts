import type { Components, JSX } from "../types/components";

interface FbDatePicker extends Components.FbDatePicker, HTMLElement {}
export const FbDatePicker: {
    prototype: FbDatePicker;
    new (): FbDatePicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
