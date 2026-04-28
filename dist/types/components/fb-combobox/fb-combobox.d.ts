import { EventEmitter } from '../../stencil-public-runtime';
export interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export type ComboboxState = 'default' | 'error' | 'disabled';
export type ComboboxSize = 'sm' | 'default' | 'lg';
export declare class FbCombobox {
    el: HTMLElement;
    /** Field label */
    label: string;
    /** JSON array of { value, label, disabled? } */
    options: ComboboxOption[] | string;
    /** Currently selected value */
    value: string;
    placeholder: string;
    state: ComboboxState;
    size: ComboboxSize;
    helperText: string;
    required: boolean;
    /** Show ✕ clear button when a value is set */
    clearable: boolean;
    /**
     * When true the user may type a value not in the options list.
     * fbChange fires with the raw typed string on blur/Enter.
     */
    freeform: boolean;
    /** Message shown when no options match the filter */
    noResultsText: string;
    open: boolean;
    inputValue: string;
    focusedIndex: number;
    /** Fires when the user selects an option (or commits a freeform value) */
    fbChange: EventEmitter<string>;
    /** Fires on every keystroke */
    fbInput: EventEmitter<string>;
    /** Fires when the field is cleared */
    fbClear: EventEmitter<void>;
    private inputId;
    private listboxId;
    private helperId;
    private labelId;
    private inputEl;
    connectedCallback(): void;
    onValueChange(newVal: string): void;
    onDocumentClick(e: MouseEvent): void;
    private get parsedOptions();
    private get filteredOptions();
    private get isDisabled();
    private get isError();
    private get hasValue();
    private openDropdown;
    private closeDropdown;
    private commitOrReset;
    private selectOption;
    private handleInput;
    private handleFocus;
    private handleBlur;
    private handleKeyDown;
    private handleClear;
    private scrollOptionIntoView;
    render(): any;
}
