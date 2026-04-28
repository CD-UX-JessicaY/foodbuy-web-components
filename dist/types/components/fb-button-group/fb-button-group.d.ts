export type GroupOrientation = 'horizontal' | 'vertical';
export declare class FbButtonGroup {
    el: HTMLElement;
    orientation: GroupOrientation;
    variant: string;
    size: string;
    componentDidLoad(): void;
    applyToButtons(): void;
    render(): any;
}
