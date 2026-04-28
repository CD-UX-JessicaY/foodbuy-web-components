export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'neutral' | 'info';
export type BadgeSize = 'sm' | 'default' | 'lg';
export declare class FbBadge {
    /** Visual style */
    variant: BadgeVariant;
    /** Size */
    size: BadgeSize;
    /**
     * Show a dot indicator instead of text.
     * When true, provide a label prop for screen readers — the dot conveys
     * meaning through colour alone which is a WCAG failure without a text alternative.
     */
    dot: boolean;
    /** Visible label text (also used as aria-label for dot variant) */
    label: string;
    render(): any;
}
