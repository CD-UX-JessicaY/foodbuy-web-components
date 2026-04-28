import { EventEmitter } from '../../stencil-public-runtime';
export type ResizableOrientation = 'horizontal' | 'vertical';
export declare class FbResizableGroup {
    el: HTMLElement;
    /** Layout direction of the two panels */
    orientation: ResizableOrientation;
    /**
     * Initial size of the "start" panel as a percentage of the container (0–100).
     * The "end" panel takes the remainder.
     */
    defaultSize: number;
    /**
     * Minimum size either panel may reach, as a percentage (0–100).
     * Prevents panels from collapsing completely.
     */
    minSize: number;
    /** Show a dot-grid grip indicator on the resize handle */
    withHandle: boolean;
    /** Accessible label read by screen readers for the resize handle */
    label: string;
    /** Fires whenever the start panel size changes (value = new percentage) */
    fbResize: EventEmitter<number>;
    startSize: number;
    /** Currently active drag session */
    private drag;
    private containerEl;
    connectedCallback(): void;
    onDefaultSizeChange(v: number): void;
    private beginDrag;
    private onDragMove;
    private onDragEnd;
    private applySize;
    private handleKeyDown;
    private get isH();
    render(): any;
}
