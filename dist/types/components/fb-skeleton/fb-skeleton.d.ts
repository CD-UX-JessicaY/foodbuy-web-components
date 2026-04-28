export type SkeletonVariant = 'text' | 'circle' | 'rect';
export declare class FbSkeleton {
    /** Shape of the skeleton placeholder */
    variant: SkeletonVariant;
    /** Width — any CSS value e.g. "200px", "100%", "12rem" */
    width: string;
    /** Height — any CSS value */
    height: string;
    render(): any;
}
