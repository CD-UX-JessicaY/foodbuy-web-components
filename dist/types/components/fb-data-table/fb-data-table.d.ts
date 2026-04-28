import { EventEmitter } from '../../stencil-public-runtime';
export declare class FbDataTable {
    el: HTMLElement;
    /** JSON array of column defs: [{key,label,sortable?,align?,type?,badgeMap?,labelMap?}] */
    columns: string;
    /** JSON array of row data objects — each row must have an `id` field */
    rows: string;
    /** Table caption / aria-label */
    caption: string;
    /** JSON array of row actions: [{id,label,variant?,separator?,labelGroup?}] */
    rowActions: string;
    /** Row density */
    density: 'default' | 'compact';
    /** When true, rows are clickable; hides checkboxes and action buttons */
    clickable: boolean;
    /** Hide the filter + columns-toggle toolbar */
    hideToolbar: boolean;
    /** Hide row-selection checkboxes */
    hideCheckboxes: boolean;
    /** Hide pagination bar */
    hidePagination: boolean;
    /** Hide rows-per-page selector */
    hideRowsPerPage: boolean;
    /** Hide selected-row count label */
    hideRowCount: boolean;
    /** Initial page size */
    initialPageSize: number;
    /** Fires when a row is clicked (clickable mode): detail = row object */
    fbRowClick: EventEmitter<any>;
    /** Fires when selection changes: detail = array of selected row IDs */
    fbSelectionChange: EventEmitter<string[]>;
    /** Fires when column sort changes: detail = {col, dir} */
    fbSortChange: EventEmitter<{
        col: string;
        dir: string;
    }>;
    /** Fires when filter input changes: detail = filter string */
    fbFilterChange: EventEmitter<string>;
    /** Fires when a row action is selected: detail = {actionId, row} */
    fbActionClick: EventEmitter<{
        actionId: string;
        row: any;
    }>;
    /** Fires when the page changes: detail = page number */
    fbPageChange: EventEmitter<number>;
    filter: string;
    sortCol: string;
    sortDir: 'asc' | 'desc';
    selected: Set<string>;
    page: number;
    pageSize: number;
    colVisibility: Record<string, boolean>;
    colMenuOpen: boolean;
    openActionRowId: string | null;
    actionMenuPos: {
        top: number;
        left: number;
    };
    rppMenuOpen: boolean;
    connectedCallback(): void;
    onColumnsChange(): void;
    private _initColVisibility;
    onDocumentClick(e: MouseEvent): void;
    private get _parsedColumns();
    private get _parsedRows();
    private get _parsedRowActions();
    private get _visibleColumns();
    private get _filteredRows();
    private get _totalPages();
    private get _paginatedRows();
    private get _allPageSelected();
    private get _somePageSelected();
    private toggleSort;
    private toggleRow;
    private toggleAll;
    private onFilterInput;
    private onPageChange;
    private openActionMenu;
    private fireAction;
    private toggleRppMenu;
    private setPageSize;
    private renderCell;
    private renderPagination;
    private renderCheckbox;
    private renderSortIcon;
    render(): any;
}
