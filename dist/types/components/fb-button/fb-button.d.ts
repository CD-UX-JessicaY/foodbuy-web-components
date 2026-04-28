import { EventEmitter } from '../../stencil-public-runtime';
export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'default' | 'lg';
export type IconPosition = 'none' | 'left' | 'right' | 'only';
export declare class FbButton {
    /** Visual style of the button */
    variant: ButtonVariant;
    /** Size of the button */
    size: ButtonSize;
    /** Position of the icon slot relative to the label */
    iconPosition: IconPosition;
    /** Full pill / circle border radius */
    rounded: boolean;
    /** Disables the button */
    disabled: boolean;
    /**
     * Accessible label — required when iconPosition="only".
     * For buttons with visible text this is set automatically from slot content,
     * but icon-only buttons have no visible text so this must be provided.
     */
    label: string;
    /** HTML type attribute */
    type: 'button' | 'submit' | 'reset';
    /** Fired when the button is clicked (not fired when disabled) */
    fbClick: EventEmitter<void>;
    private handleClick;
    render(): any;
}
