import { EventEmitter } from '../../stencil-public-runtime';
export interface DropdownItem {
    id: string;
    label: string;
    disabled?: boolean;
    danger?: boolean;
}
export declare class FbDropdown {
    el: HTMLElement;
    label: string;
    items: DropdownItem[] | string;
    disabled: boolean;
    variant: 'default' | 'secondary' | 'ghost';
    open: boolean;
    focusedIndex: number;
    fbSelect: EventEmitter<string>;
    private triggerId;
    private menuId;
    connectedCallback(): void;
    onDocumentClick(e: MouseEvent): void;
    private get parsedItems();
    private get enabledItems();
    private toggle;
    private openMenu;
    private close;
    private select;
    private focusItem;
    private handleTriggerKeyDown;
    private handleMenuKeyDown;
    render(): any;
}
