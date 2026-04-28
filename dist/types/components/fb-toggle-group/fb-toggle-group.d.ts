import { EventEmitter } from '../../stencil-public-runtime';
export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupVariant = 'default' | 'outline';
export type ToggleGroupSize = 'sm' | 'default' | 'lg';
export type ToggleGroupOrientation = 'horizontal' | 'vertical';
export interface ToggleItem {
    value: string;
    label?: string;
    icon?: string;
    disabled?: boolean;
}
export declare class FbToggleGroup {
    type: ToggleGroupType;
    variant: ToggleGroupVariant;
    size: ToggleGroupSize;
    orientation: ToggleGroupOrientation;
    disabled: boolean;
    label: string;
    /** JSON array of { value, label?, icon?, disabled? } */
    items: string;
    /** Current selection — string for single, JSON array for multiple */
    value: string;
    selected: Set<string>;
    fbChange: EventEmitter<string | string[]>;
    componentWillLoad(): void;
    onValueChange(): void;
    private initSelection;
    private parsedItems;
    private toggle;
    private borderRadius;
    render(): any;
}
