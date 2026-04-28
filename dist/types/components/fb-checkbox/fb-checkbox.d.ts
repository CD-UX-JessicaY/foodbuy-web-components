import { EventEmitter } from '../../stencil-public-runtime';
export type CheckboxState = 'default' | 'error' | 'disabled';
export type CheckboxSize = 'sm' | 'md' | 'lg';
export declare class FbCheckbox {
    /** Visible label */
    label: string;
    checked: boolean;
    /** Shows a dash/minus — used for "select all" when some items are selected */
    indeterminate: boolean;
    state: CheckboxState;
    size: CheckboxSize;
    helperText: string;
    required: boolean;
    /** Explicit value used when inside a form */
    value: string;
    fbChange: EventEmitter<boolean>;
    private inputId;
    private helperId;
    connectedCallback(): void;
    private get isDisabled();
    private get isError();
    render(): any;
}
