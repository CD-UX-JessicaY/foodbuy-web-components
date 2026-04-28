import { EventEmitter } from '../../stencil-public-runtime';
export type InputSize = 'sm' | 'default' | 'lg';
export type InputState = 'default' | 'error' | 'disabled' | 'read-only';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url';
export declare class FbInput {
    el: HTMLElement;
    /** Visible label text — always provide this for accessibility */
    label: string;
    /** HTML input type */
    type: InputType;
    /** Size variant */
    size: InputSize;
    /** Visual and interaction state */
    state: InputState;
    /** Placeholder text */
    placeholder: string;
    /** Current value */
    value: string;
    /** Helper or error message shown below the input */
    helperText: string;
    /** Marks the field as required */
    required: boolean;
    /** Marks the field as required */
    clearable: boolean;
    /** Left adornment text (e.g. "$") */
    prefixText: string;
    /** Right adornment text (e.g. ".00") */
    suffixText: string;
    /** Fired when the value changes */
    fbChange: EventEmitter<string>;
    /** Fired when the input receives focus */
    fbFocus: EventEmitter<void>;
    /** Fired when the input loses focus */
    fbBlur: EventEmitter<void>;
    showPassword: boolean;
    private inputId;
    private helperId;
    connectedCallback(): void;
    private get isDisabled();
    private get isReadOnly();
    private get isError();
    private handleInput;
    private handleClear;
    private togglePassword;
    render(): any;
}
