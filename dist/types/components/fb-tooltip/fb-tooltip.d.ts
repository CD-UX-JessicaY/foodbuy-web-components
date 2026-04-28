export declare class FbTooltip {
    el: HTMLElement;
    content: string;
    placement: 'top' | 'bottom' | 'left' | 'right';
    visible: boolean;
    private tooltipId;
    connectedCallback(): void;
    private show;
    private hide;
    render(): any;
}
