import { EventEmitter } from '../../stencil-public-runtime';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export type SelectState = 'default' | 'error' | 'disabled';
export type SelectSize = 'sm' | 'default' | 'lg';
export declare class FbSelect {
    el: HTMLElement;
    label: string;
    options: SelectOption[] | string;
    value: string;
    placeholder: string;
    state: SelectState;
    size: SelectSize;
    helperText: string;
    required: boolean;
    open: boolean;
    focusedIndex: number;
    fbChange: EventEmitter<string>;
    private triggerId;
    private listboxId;
    private helperId;
    private labelId;
    connectedCallback(): void;
    onDocumentClick(e: MouseEvent): void;
    private get parsedOptions();
    private get isDisabled();
    private get isError();
    private get selectedOption();
    private open_;
    private close;
    private selectOption;
    private handleTriggerKeyDown;
    private handleOptionKeyDown;
    render(): any;
}
