import { EventEmitter } from '../../stencil-public-runtime';
export interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export declare class FbRadioGroup {
    /** Group label — rendered as <legend> inside a <fieldset> */
    label: string;
    options: RadioOption[] | string;
    value: string;
    required: boolean;
    disabled: boolean;
    helperText: string;
    state: 'default' | 'error';
    fbChange: EventEmitter<string>;
    private groupName;
    private helperId;
    connectedCallback(): void;
    private get parsedOptions();
    private get isError();
    render(): any;
}
