import { EventEmitter } from '../../stencil-public-runtime';
export declare class FbSwitch {
    /** Visible label */
    label: string;
    checked: boolean;
    disabled: boolean;
    helperText: string;
    fbChange: EventEmitter<boolean>;
    private switchId;
    private helperId;
    connectedCallback(): void;
    render(): any;
}
