import { VNode } from '../stencil-public-runtime';
/** Renders the field label with optional required asterisk */
export declare function renderFieldLabel(label: string, required: boolean, inputId: string, labelId?: string): VNode | null;
/** Renders helper / error text below a form control */
export declare function renderHelperText(helperText: string, helperId: string, isError: boolean): VNode | null;
