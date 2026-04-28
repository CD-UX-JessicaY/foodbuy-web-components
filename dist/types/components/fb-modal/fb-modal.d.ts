import { EventEmitter } from '../../stencil-public-runtime';
export type ModalSize = 'sm' | 'default' | 'lg' | 'fullscreen';
export declare class FbModal {
    el: HTMLElement;
    open: boolean;
    size: ModalSize;
    heading: string;
    description: string;
    showFooter: boolean;
    closeOnOverlay: boolean;
    confirmLabel: string;
    cancelLabel: string;
    fbClose: EventEmitter<void>;
    fbConfirm: EventEmitter<void>;
    private titleId;
    private descId;
    private triggerElement;
    connectedCallback(): void;
    onOpenChange(isOpen: boolean): void;
    private focusFirstElement;
    private getFocusableElements;
    private handleKeyDown;
    private close;
    render(): any;
}
