import { EventEmitter } from '../../stencil-public-runtime';
export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';
export declare class FbToast {
    variant: ToastVariant;
    message: string;
    visible: boolean;
    /** Auto-dismiss delay in ms. 0 = no auto-dismiss. Minimum recommended: 5000 */
    duration: number;
    animatingOut: boolean;
    fbDismiss: EventEmitter<void>;
    private timer;
    onVisibleChange(newVal: boolean): void;
    disconnectedCallback(): void;
    private dismiss;
    render(): any;
}
