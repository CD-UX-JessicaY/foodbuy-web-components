export type SpinnerSize = 'sm' | 'default' | 'lg';
export declare class FbSpinner {
    /** Size of the spinner */
    size: SpinnerSize;
    /** Accessible label announced to screen readers */
    label: string;
    render(): any;
}
