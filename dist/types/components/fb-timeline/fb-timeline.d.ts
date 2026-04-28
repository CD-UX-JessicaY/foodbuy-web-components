export interface TimelineItem {
    id: string;
    title: string;
    description?: string;
    timestamp?: string;
    status?: 'complete' | 'active' | 'pending';
}
export declare class FbTimeline {
    items: TimelineItem[] | string;
    label: string;
    orientation: 'vertical' | 'horizontal';
    private get parsedItems();
    private statusIcon;
    render(): any;
}
