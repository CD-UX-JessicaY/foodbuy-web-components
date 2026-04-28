import { EventEmitter } from '../../stencil-public-runtime';
export type TextareaState = 'default' | 'error' | 'disabled' | 'read-only';
export type TextareaSize = 'sm' | 'default' | 'lg';
export declare class FbTextarea {
    /** Visible label — always provide for accessibility */
    label: string;
    size: TextareaSize;
    state: TextareaState;
    placeholder: string;
    value: string;
    helperText: string;
    required: boolean;
    /** Number of visible text rows */
    rows: number;
    /** Character limit — shows counter when set */
    maxLength: number;
    fbChange: EventEmitter<string>;
    fbFocus: EventEmitter<void>;
    fbBlur: EventEmitter<void>;
    private textareaId;
    private helperId;
    connectedCallback(): void;
    private get isDisabled();
    private get isReadOnly();
    private get isError();
    render(): any;
}
