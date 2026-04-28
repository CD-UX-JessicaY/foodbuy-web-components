import { EventEmitter } from '../../stencil-public-runtime';
export declare class FbSideSheet {
    el: HTMLElement;
    open: boolean;
    heading: string;
    side: 'left' | 'right';
    size: 'sm' | 'default' | 'lg';
    _open: boolean;
    fbClose: EventEmitter<void>;
    private sheetId;
    private headingId;
    private triggerElement;
    connectedCallback(): void;
    onOpenChange(val: boolean): void;
    onWindowKeydown(e: KeyboardEvent): void;
    private trapFocus;
    private close;
    render(): any;
}
