import { EventEmitter } from '../../stencil-public-runtime';
export interface TabItem {
    id: string;
    label: string;
    disabled?: boolean;
}
export type TabsVariant = 'underline' | 'pill';
export type TabsSize = 'sm' | 'default' | 'lg';
export declare class FbTabs {
    tabs: TabItem[] | string;
    activeTab: string;
    variant: TabsVariant;
    size: TabsSize;
    fullWidth: boolean;
    label: string;
    _activeTab: string;
    fbTabChange: EventEmitter<string>;
    private baseId;
    connectedCallback(): void;
    private get parsedTabs();
    private tabId;
    private panelId;
    private activate;
    private handleKeyDown;
    private el;
    render(): any;
}
