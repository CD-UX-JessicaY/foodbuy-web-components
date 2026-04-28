import { EventEmitter } from '../../stencil-public-runtime';
export interface SidebarItem {
    id: string;
    label: string;
    href?: string;
    icon?: string;
    children?: SidebarItem[];
    disabled?: boolean;
}
export declare class FbSidebar {
    items: SidebarItem[] | string;
    label: string;
    activeId: string;
    collapsed: boolean;
    expandedIds: Set<string>;
    fbNavigate: EventEmitter<string>;
    private _instanceId;
    connectedCallback(): void;
    private get parsedItems();
    private toggleExpand;
    private navigate;
    private panelId;
    private triggerId;
    private renderItems;
    render(): any;
}
