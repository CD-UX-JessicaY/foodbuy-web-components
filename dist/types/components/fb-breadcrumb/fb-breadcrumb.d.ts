export interface BreadcrumbItem {
    label: string;
    href?: string;
}
export declare class FbBreadcrumb {
    items: BreadcrumbItem[] | string;
    label: string;
    private get parsedItems();
    render(): any;
}
