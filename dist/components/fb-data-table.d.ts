import type { Components, JSX } from "../types/components";

interface FbDataTable extends Components.FbDataTable, HTMLElement {}
export const FbDataTable: {
    prototype: FbDataTable;
    new (): FbDataTable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
