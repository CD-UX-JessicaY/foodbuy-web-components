import { EventEmitter } from '../../stencil-public-runtime';
export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'sm' | 'default' | 'lg';
export declare class FbToggle {
    variant: ToggleVariant;
    size: ToggleSize;
    pressed: boolean;
    disabled: boolean;
    /** aria-label — required for icon-only toggles */
    label: string;
    fbPressedChange: EventEmitter<boolean>;
    private handleClick;
    render(): any;
}
