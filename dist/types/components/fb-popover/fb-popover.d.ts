import { EventEmitter } from '../../stencil-public-runtime';
export declare class FbPopover {
    el: HTMLElement;
    heading: string;
    placement: 'top' | 'bottom' | 'left' | 'right';
    open: boolean;
    _open: boolean;
    fbOpen: EventEmitter<void>;
    fbClose: EventEmitter<void>;
    private triggerId;
    private popoverId;
    private triggerEl;
    connectedCallback(): void;
    onOpenChange(val: boolean): void;
    onDocumentClick(e: MouseEvent): void;
    private toggle;
    private openPopover;
    private closePopover;
    private getFocusableElements;
    private handleKeyDown;
    render(): any;
}
