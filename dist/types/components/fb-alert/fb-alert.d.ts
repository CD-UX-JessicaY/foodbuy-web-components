import { EventEmitter } from '../../stencil-public-runtime';
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export declare class FbAlert {
    variant: AlertVariant;
    heading: string;
    description: string;
    dismissible: boolean;
    dismissed: boolean;
    fbDismiss: EventEmitter<void>;
    private handleDismiss;
    render(): any;
}
