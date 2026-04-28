import { EventEmitter } from '../../stencil-public-runtime';
export declare class FbChip {
    label: string;
    variant: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    size: 'sm' | 'default';
    /** Makes the chip selectable (toggle). Uses role="option" + aria-selected. */
    selectable: boolean;
    selected: boolean;
    /** Shows a remove (×) button. Emits fbRemove. */
    dismissible: boolean;
    disabled: boolean;
    fbSelect: EventEmitter<boolean>;
    fbRemove: EventEmitter<void>;
    private handleClick;
    render(): any;
}
