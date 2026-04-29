'use strict';

var index = require('./index-BA9qOWo8.js');

const fbDataTableCss = () => `:host{display:block}.fb-dt-wrapper{position:relative;font-family:var(--font-family-primary)}.fb-dt-toolbar{display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-12);margin-bottom:var(--spacing-16)}.fb-dt-filter{flex:1;max-width:320px;height:36px;padding:0 var(--spacing-12);font-size:var(--font-size-14);font-family:var(--font-family-primary);border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);color:var(--color-neutral-black);background:var(--color-neutral-white);outline:none;transition:border-color 0.15s}.fb-dt-filter:focus{border-color:var(--color-primary-500);outline:2px solid var(--focus-color);outline-offset:0}.fb-dt-col-wrap{position:relative}.fb-dt-col-btn{height:36px;padding:0 var(--spacing-12);display:inline-flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-14);font-family:var(--font-family-primary);font-weight:var(--font-weight-semibold);border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background:var(--color-neutral-white);cursor:pointer;color:var(--color-neutral-black);transition:border-color 0.15s}.fb-dt-col-btn:hover,.fb-dt-col-btn.is-open{border-color:var(--color-primary-500)}.fb-dt-col-btn:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:1px}.fb-dt-col-menu{position:absolute;top:calc(100% + 4px);right:0;background:var(--color-neutral-white);border:var(--border-standard) solid var(--color-neutral-100);border-radius:var(--radius-sm);box-shadow:0 4px 16px rgba(0, 0, 0, 0.08);min-width:160px;padding:var(--spacing-4);z-index:50}.fb-dt-col-item{display:flex;align-items:center;gap:var(--spacing-8);padding:var(--spacing-4) var(--spacing-8);border-radius:var(--radius-xs);font-size:var(--font-size-14);color:var(--color-neutral-black);font-family:var(--font-family-primary);cursor:pointer;transition:background 0.1s}.fb-dt-col-item:hover{background:var(--color-neutral-50)}.fb-dt-col-item input[type='checkbox']{accent-color:var(--color-primary-500);cursor:pointer}.fb-dt-caption{font-size:var(--font-size-16);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black);font-family:var(--font-family-primary);margin:0 0 var(--spacing-4) 0}.fb-dt-table-wrap{border:var(--border-standard) solid var(--color-neutral-300);border-radius:var(--radius-sm);overflow:hidden}.fb-dt-scroll{overflow-x:auto}.fb-dt-table{width:100%;border-collapse:collapse}.fb-dt-th{padding:var(--spacing-12);text-align:left;font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black);background:var(--color-neutral-50);border-bottom:var(--border-standard) solid var(--color-neutral-300);font-family:var(--font-family-primary);white-space:nowrap;user-select:none;outline:none}.fb-dt-th--sortable{cursor:pointer}.fb-dt-th--sortable:hover{color:var(--color-primary-600)}.fb-dt-th--sortable:focus-visible{box-shadow:inset 0 0 0 2px var(--focus-color)}.fb-dt-th--right{text-align:right}.fb-dt-th--cb{width:44px}.fb-dt-th--actions{width:48px}.fb-dt-th-inner{display:inline-flex;align-items:center;gap:var(--spacing-4);width:100%}.fb-dt-th-inner--right{justify-content:flex-end}.fb-dt-sort-icon{flex-shrink:0;color:var(--color-neutral-black)}.fb-dt-sort-icon--inactive{color:var(--color-neutral-600)}.fb-dt-row{background:var(--color-neutral-white);transition:background 0.1s}.fb-dt-row--selected{background:var(--color-primary-50)}.fb-dt-row--clickable{cursor:pointer;outline:none}.fb-dt-row--clickable:hover{background:var(--color-primary-50)}.fb-dt-row--clickable:active{background:var(--color-primary-100)}.fb-dt-row--clickable:focus-visible{outline:2px solid var(--focus-color);outline-offset:-2px}.fb-dt-td{padding:var(--spacing-12);font-size:var(--font-size-14);color:var(--color-neutral-black);border-bottom:var(--border-standard) solid var(--color-neutral-300);font-family:var(--font-family-primary)}.fb-dt-row--compact .fb-dt-td{padding:var(--spacing-4) var(--spacing-12)}.fb-dt-td--last{border-bottom:none}.fb-dt-td--right{text-align:right}.fb-dt-td--bold{font-weight:var(--font-weight-semibold)}.fb-dt-td--muted{color:var(--color-neutral-500)}.fb-dt-td--empty{text-align:center;color:var(--color-neutral-500);padding:var(--spacing-40)}.fb-dt-td--cb{width:44px}.fb-dt-td--actions{width:48px}.fb-dt-cb{width:16px;height:16px;border-radius:var(--radius-xs);border:var(--border-standard) solid var(--color-neutral-400);background:var(--color-neutral-white);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all 0.15s;outline:none}.fb-dt-cb:focus-visible{outline:2px solid var(--focus-color);outline-offset:2px}.fb-dt-cb--checked,.fb-dt-cb--indeterminate{background:var(--color-primary-500);border-color:var(--color-primary-500)}.fb-dt-cb-dash{width:8px;height:2px;background:var(--color-neutral-white);border-radius:var(--radius-min)}.fb-dt-action-btn{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:none;border-radius:var(--radius-sm);background:transparent;cursor:pointer;color:var(--color-neutral-500);transition:all 0.15s;outline:none}.fb-dt-action-btn:hover{background:var(--color-neutral-50);color:var(--color-neutral-black)}.fb-dt-action-btn.is-open{background:var(--color-primary-50);color:var(--color-primary-600)}.fb-dt-action-btn:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px}.fb-dt-action-menu{position:absolute;background:var(--color-neutral-white);border:var(--border-standard) solid var(--color-neutral-100);border-radius:var(--radius-sm);box-shadow:0 8px 24px rgba(0, 0, 0, 0.12);min-width:180px;padding:var(--spacing-4);z-index:100}.fb-dt-action-item{padding:6px var(--spacing-8);border-radius:var(--radius-xs);font-size:var(--font-size-14);font-family:var(--font-family-primary);cursor:pointer;color:var(--color-neutral-black);outline:none;transition:background 0.1s}.fb-dt-action-item:hover{background:var(--color-neutral-50)}.fb-dt-action-item:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px}.fb-dt-action-item--danger{color:var(--color-danger-500)}.fb-dt-action-item--danger:hover{background:var(--color-danger-50)}.fb-dt-action-sep{height:1px;background:var(--color-neutral-100);margin:var(--spacing-4) 0}.fb-dt-action-lbl{padding:var(--spacing-4) var(--spacing-8);font-size:var(--font-size-12);font-weight:var(--font-weight-semibold);color:var(--color-neutral-500);font-family:var(--font-family-primary)}.fb-dt-footer{display:flex;align-items:center;margin-top:var(--spacing-16);gap:var(--spacing-12);flex-wrap:wrap;position:relative;min-height:40px}.fb-dt-row-count{font-size:var(--font-size-14);color:var(--color-neutral-black);font-family:var(--font-family-primary);flex:1;min-width:0}.fb-dt-footer-center{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap}.fb-dt-footer-right{display:flex;align-items:center;gap:var(--spacing-8);flex:1;justify-content:flex-end}.fb-dt-pager{display:flex;align-items:center;gap:var(--spacing-4)}.fb-dt-pager-nav{height:36px;display:inline-flex;align-items:center;padding:0 var(--spacing-12);gap:var(--spacing-4);font-size:var(--font-size-14);font-family:var(--font-family-primary);border-radius:var(--radius-sm);border:none;background:transparent;color:var(--color-neutral-black);cursor:pointer;transition:background 0.15s;outline:none}.fb-dt-pager-nav:hover:not(:disabled){background:var(--color-neutral-50)}.fb-dt-pager-nav:disabled,.fb-dt-pager-nav--disabled{color:var(--color-neutral-300);cursor:not-allowed}.fb-dt-pager-nav:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px}.fb-dt-pager-pages{display:flex;align-items:center;gap:var(--spacing-4)}.fb-dt-pager-page{min-width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;padding:0 6px;font-size:var(--font-size-14);font-family:var(--font-family-primary);border-radius:var(--radius-sm);border:1px solid transparent;background:transparent;color:var(--color-neutral-black);cursor:pointer;transition:all 0.15s;outline:none}.fb-dt-pager-page:hover{background:var(--color-neutral-50)}.fb-dt-pager-page:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px}.fb-dt-pager-page--active{border-color:var(--color-primary-500);background:var(--color-primary-50);color:var(--color-primary-600);font-weight:var(--font-weight-semibold)}.fb-dt-pager-ellipsis{min-width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;font-size:var(--font-size-14);font-family:var(--font-family-primary);color:var(--color-neutral-500)}.fb-dt-rpp{display:flex;align-items:center;gap:var(--spacing-8)}.fb-dt-rpp-label{font-size:var(--font-size-14);font-family:var(--font-family-primary);color:var(--color-neutral-black);white-space:nowrap}.fb-dt-rpp-wrap{position:relative;display:inline-block}.fb-dt-rpp-btn{height:40px;min-width:72px;padding:var(--spacing-8) var(--spacing-12);display:inline-flex;align-items:center;justify-content:space-between;gap:var(--spacing-8);font-size:var(--font-size-14);font-family:var(--font-family-primary);border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background:var(--color-neutral-white);cursor:pointer;color:var(--color-neutral-black);outline:none;transition:border-color 0.15s}.fb-dt-rpp-btn:hover,.fb-dt-rpp-btn.is-open{border-color:var(--color-primary-500)}.fb-dt-rpp-btn:focus-visible{outline:2px solid var(--focus-color);outline-offset:2px}.fb-dt-rpp-menu{position:absolute;bottom:calc(100% + 4px);left:0;background:var(--color-neutral-white);border:var(--border-standard) solid var(--color-neutral-100);border-radius:var(--radius-sm);box-shadow:0 -4px 16px rgba(0, 0, 0, 0.08);min-width:72px;padding:var(--spacing-4);z-index:100}.fb-dt-rpp-opt{padding:6px var(--spacing-8);border-radius:var(--radius-xs);font-size:var(--font-size-14);font-family:var(--font-family-primary);cursor:pointer;color:var(--color-neutral-black);display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-4);transition:background 0.1s}.fb-dt-rpp-opt:hover{background:var(--color-neutral-50)}.fb-dt-rpp-opt--active{background:var(--color-primary-50);color:var(--color-primary-600);font-weight:var(--font-weight-semibold)}.fb-dt-rpp-opt--active svg{color:var(--color-primary-500)}`;

function titleCase(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
const RPP_OPTIONS = [5, 10, 25, 50];
const FbDataTable = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbRowClick = index.createEvent(this, "fbRowClick");
        this.fbSelectionChange = index.createEvent(this, "fbSelectionChange");
        this.fbSortChange = index.createEvent(this, "fbSortChange");
        this.fbFilterChange = index.createEvent(this, "fbFilterChange");
        this.fbActionClick = index.createEvent(this, "fbActionClick");
        this.fbPageChange = index.createEvent(this, "fbPageChange");
        /** JSON array of column defs: [{key,label,sortable?,align?,type?,badgeMap?,labelMap?}] */
        this.columns = '[]';
        /** JSON array of row data objects — each row must have an `id` field */
        this.rows = '[]';
        /** Table caption / aria-label */
        this.caption = '';
        /** JSON array of row actions: [{id,label,variant?,separator?,labelGroup?}] */
        this.rowActions = '';
        /** Row density */
        this.density = 'default';
        /** When true, rows are clickable; hides checkboxes and action buttons */
        this.clickable = false;
        /** Hide the filter + columns-toggle toolbar */
        this.hideToolbar = false;
        /** Hide row-selection checkboxes */
        this.hideCheckboxes = false;
        /** Hide pagination bar */
        this.hidePagination = false;
        /** Hide rows-per-page selector */
        this.hideRowsPerPage = false;
        /** Hide selected-row count label */
        this.hideRowCount = false;
        /** Initial page size */
        this.initialPageSize = 5;
        this.filter = '';
        this.sortCol = '';
        this.sortDir = 'asc';
        this.selected = new Set();
        this.page = 1;
        this.pageSize = 5;
        this.colVisibility = {};
        this.colMenuOpen = false;
        this.openActionRowId = null;
        this.actionMenuPos = { top: 0, left: 0 };
        this.rppMenuOpen = false;
        // ── Actions ──────────────────────────────────────────────────────────────
        this.toggleSort = (col) => {
            if (this.sortCol === col) {
                this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
            }
            else {
                this.sortCol = col;
                this.sortDir = 'asc';
            }
            this.page = 1;
            this.fbSortChange.emit({ col, dir: this.sortDir });
        };
        this.toggleRow = (id) => {
            const s = new Set(this.selected);
            s.has(id) ? s.delete(id) : s.add(id);
            this.selected = s;
            this.fbSelectionChange.emit([...s]);
        };
        this.toggleAll = () => {
            const s = new Set(this.selected);
            if (this._allPageSelected) {
                this._paginatedRows.forEach(r => s.delete(r.id));
            }
            else {
                this._paginatedRows.forEach(r => s.add(r.id));
            }
            this.selected = s;
            this.fbSelectionChange.emit([...s]);
        };
        this.onFilterInput = (e) => {
            const val = e.target.value;
            this.filter = val;
            this.page = 1;
            this.fbFilterChange.emit(val);
        };
        this.onPageChange = (p) => {
            this.page = p;
            this.fbPageChange.emit(p);
        };
        this.openActionMenu = (rowId, e) => {
            e.stopPropagation();
            if (this.openActionRowId === rowId) {
                this.openActionRowId = null;
                return;
            }
            const btn = e.currentTarget;
            const btnRect = btn.getBoundingClientRect();
            const hostRect = this.el.getBoundingClientRect();
            this.actionMenuPos = {
                top: btnRect.bottom - hostRect.top + 4,
                left: Math.max(0, btnRect.right - hostRect.left - 180),
            };
            this.openActionRowId = rowId;
        };
        this.fireAction = (actionId, rowId) => {
            const row = this._parsedRows.find(r => r.id === rowId);
            this.fbActionClick.emit({ actionId, row });
            this.openActionRowId = null;
        };
        this.toggleRppMenu = (e) => {
            e.stopPropagation();
            this.rppMenuOpen = !this.rppMenuOpen;
            this.colMenuOpen = false;
        };
        this.setPageSize = (size) => {
            this.pageSize = size;
            this.page = 1;
            this.rppMenuOpen = false;
        };
    }
    connectedCallback() {
        this.pageSize = this.initialPageSize > 0 ? this.initialPageSize : 5;
        this._initColVisibility();
    }
    onColumnsChange() { this._initColVisibility(); }
    _initColVisibility() {
        const vis = Object.assign({}, this.colVisibility);
        this._parsedColumns.forEach(c => {
            if (!(c.key in vis))
                vis[c.key] = !c.hidden;
        });
        this.colVisibility = vis;
    }
    onDocumentClick(e) {
        if (!this.el.contains(e.target)) {
            this.colMenuOpen = false;
            this.openActionRowId = null;
            this.rppMenuOpen = false;
        }
    }
    // ── Parsed props ─────────────────────────────────────────────────────────
    get _parsedColumns() {
        try {
            const c = typeof this.columns === 'string' ? JSON.parse(this.columns) : this.columns;
            return Array.isArray(c) ? c : [];
        }
        catch (_a) {
            return [];
        }
    }
    get _parsedRows() {
        try {
            const r = typeof this.rows === 'string' ? JSON.parse(this.rows) : this.rows;
            return Array.isArray(r) ? r : [];
        }
        catch (_a) {
            return [];
        }
    }
    get _parsedRowActions() {
        if (!this.rowActions)
            return [];
        try {
            const a = typeof this.rowActions === 'string' ? JSON.parse(this.rowActions) : this.rowActions;
            return Array.isArray(a) ? a : [];
        }
        catch (_a) {
            return [];
        }
    }
    get _visibleColumns() {
        return this._parsedColumns.filter(c => this.colVisibility[c.key] !== false);
    }
    // ── Data processing ──────────────────────────────────────────────────────
    get _filteredRows() {
        let rows = this._parsedRows;
        if (this.filter) {
            const q = this.filter.toLowerCase();
            rows = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
        }
        if (this.sortCol) {
            const col = this.sortCol;
            const dir = this.sortDir;
            rows = [...rows].sort((a, b) => {
                const av = a[col], bv = b[col];
                const cmp = av > bv ? 1 : av < bv ? -1 : 0;
                return dir === 'asc' ? cmp : -cmp;
            });
        }
        return rows;
    }
    get _totalPages() {
        return Math.max(1, Math.ceil(this._filteredRows.length / this.pageSize));
    }
    get _paginatedRows() {
        const start = (this.page - 1) * this.pageSize;
        return this._filteredRows.slice(start, start + this.pageSize);
    }
    // ── Selection ────────────────────────────────────────────────────────────
    get _allPageSelected() {
        const pg = this._paginatedRows;
        return pg.length > 0 && pg.every(r => this.selected.has(r.id));
    }
    get _somePageSelected() {
        return this._paginatedRows.some(r => this.selected.has(r.id)) && !this._allPageSelected;
    }
    // ── Cell renderer ────────────────────────────────────────────────────────
    renderCell(col, row) {
        var _a, _b;
        const val = row[col.key];
        if (val === undefined || val === null)
            return '';
        switch (col.type) {
            case 'badge': {
                const variant = (_a = (col.badgeMap && col.badgeMap[val])) !== null && _a !== void 0 ? _a : String(val);
                const label = (_b = (col.labelMap && col.labelMap[val])) !== null && _b !== void 0 ? _b : titleCase(String(val));
                return index.h("fb-badge", { variant: variant }, label);
            }
            case 'currency':
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(val));
            default:
                return String(val);
        }
    }
    // ── Pagination ───────────────────────────────────────────────────────────
    renderPagination() {
        const total = this._totalPages;
        const cur = this.page;
        const pages = [];
        const range = [];
        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= cur - 1 && i <= cur + 1))
                range.push(i);
        }
        let prev;
        for (const p of range) {
            if (prev !== undefined && p - prev > 1)
                pages.push('...');
            pages.push(p);
            prev = p;
        }
        return (index.h("nav", { class: "fb-dt-pager", "aria-label": "Pagination" }, index.h("button", { class: { 'fb-dt-pager-nav': true, 'fb-dt-pager-nav--disabled': cur <= 1 }, disabled: cur <= 1, "aria-label": "Previous page", onClick: () => cur > 1 && this.onPageChange(cur - 1) }, index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M10 3L5 8l5 5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })), "Previous"), index.h("div", { class: "fb-dt-pager-pages" }, pages.map((p, i) => p === '...'
            ? index.h("span", { class: "fb-dt-pager-ellipsis", key: `e${i}` }, "\u00B7\u00B7\u00B7")
            : index.h("button", { key: p, class: { 'fb-dt-pager-page': true, 'fb-dt-pager-page--active': p === cur }, "aria-label": `Page ${p}`, "aria-current": p === cur ? 'page' : undefined, onClick: () => this.onPageChange(p) }, p))), index.h("button", { class: { 'fb-dt-pager-nav': true, 'fb-dt-pager-nav--disabled': cur >= total }, disabled: cur >= total, "aria-label": "Next page", onClick: () => cur < total && this.onPageChange(cur + 1) }, "Next", index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M6 3l5 5-5 5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })))));
    }
    // ── Checkbox ─────────────────────────────────────────────────────────────
    renderCheckbox(checked, indeterminate, onChange, label) {
        return (index.h("div", { class: {
                'fb-dt-cb': true,
                'fb-dt-cb--checked': checked && !indeterminate,
                'fb-dt-cb--indeterminate': indeterminate,
            }, role: "checkbox", "aria-checked": indeterminate ? 'mixed' : (checked ? 'true' : 'false'), "aria-label": label, tabIndex: 0, onClick: onChange, onKeyDown: e => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onChange();
                }
            } }, checked && !indeterminate && (index.h("svg", { "aria-hidden": "true", width: "10", height: "10", viewBox: "0 0 10 10", fill: "none" }, index.h("path", { d: "M2 5l2.5 2.5L8 3", stroke: "white", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }))), indeterminate && index.h("div", { class: "fb-dt-cb-dash" })));
    }
    // ── Sort icon ─────────────────────────────────────────────────────────────
    renderSortIcon(colKey) {
        const dir = this.sortCol === colKey ? this.sortDir : null;
        if (dir === 'asc')
            return (index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", class: "fb-dt-sort-icon" }, index.h("path", { d: "M8 3v10M4 7l4-4 4 4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })));
        if (dir === 'desc')
            return (index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", class: "fb-dt-sort-icon" }, index.h("path", { d: "M8 3v10M4 9l4 4 4-4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })));
        return (index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", class: "fb-dt-sort-icon fb-dt-sort-icon--inactive" }, index.h("path", { d: "M5 6l3-3 3 3M5 10l3 3 3-3", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round", opacity: "0.4" })));
    }
    // ── Render ────────────────────────────────────────────────────────────────
    render() {
        const cols = this._visibleColumns;
        const allCols = this._parsedColumns;
        const pagRows = this._paginatedRows;
        const actions = this._parsedRowActions;
        const showCbs = !this.clickable && !this.hideCheckboxes;
        const showAct = !this.clickable && actions.length > 0;
        const colSpan = cols.length + (showCbs ? 1 : 0) + (showAct ? 1 : 0);
        const showFooter = !this.hideRowCount || !this.hidePagination || !this.hideRowsPerPage;
        return (index.h(index.Host, { key: 'e5a5c417f048d8932f9384d99b9356baa4199215' }, index.h("div", { key: '4bc0189d9c1297f8498eefebe6ee6e23f447d125', class: "fb-dt-wrapper" }, !this.hideToolbar && (index.h("div", { key: '473cfc956bc93cdd054e3de305b279161b41703a', class: "fb-dt-toolbar" }, index.h("input", { key: 'd3b16d5f1d77407267a9593a8fb770ba51a07e2a', class: "fb-dt-filter", type: "search", placeholder: "Filter by name or email\u2026", value: this.filter, "aria-label": "Filter rows", onInput: this.onFilterInput }), index.h("div", { key: '1b49e583159f7f6c2e4117e61898993772261a6f', class: "fb-dt-col-wrap" }, index.h("button", { key: '9484a721d5daed28eafa9aa1bd5d99ee3ee4f409', class: { 'fb-dt-col-btn': true, 'is-open': this.colMenuOpen }, "aria-haspopup": "true", "aria-expanded": this.colMenuOpen ? 'true' : 'false', onClick: e => { e.stopPropagation(); this.colMenuOpen = !this.colMenuOpen; this.rppMenuOpen = false; } }, index.h("svg", { key: '301055c50e4ff5fc6b8a13260c468512ac172ae5', "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 14 14", fill: "none" }, index.h("rect", { key: 'e910bc0d3e0d17d5a8174d56ab59816f1ddf18d5', x: "1", y: "1", width: "12", height: "2.5", rx: "1", fill: "currentColor", opacity: "0.5" }), index.h("rect", { key: '34606f8d0051da0e0c9bcc3a687c1d3276a0bac0', x: "1", y: "5.75", width: "12", height: "2.5", rx: "1", fill: "currentColor" }), index.h("rect", { key: 'b806dd7aed3b350f533ed2ecc071261e3da4cd21', x: "1", y: "10.5", width: "8", height: "2.5", rx: "1", fill: "currentColor", opacity: "0.5" })), "Columns"), this.colMenuOpen && (index.h("div", { key: '1c31ff6724c42c0dc92630f09cd82eb302853ba3', class: "fb-dt-col-menu", role: "menu", "aria-label": "Toggle columns" }, allCols.map(col => (index.h("label", { class: "fb-dt-col-item", key: col.key }, index.h("input", { type: "checkbox", checked: this.colVisibility[col.key] !== false, onChange: () => {
                this.colVisibility = Object.assign(Object.assign({}, this.colVisibility), { [col.key]: !(this.colVisibility[col.key] !== false) });
            } }), col.label)))))))), this.caption && index.h("h3", { key: 'ca7e1b1051bc852e1dc1e43cb188e0fa130e70f1', class: "fb-dt-caption" }, this.caption), index.h("div", { key: 'b1912981db40b8efd6747d2d87f684812f299aa1', class: "fb-dt-table-wrap" }, index.h("div", { key: '8036f5fb7534f1531da8200d553688e2b639777f', class: "fb-dt-scroll", tabIndex: 0, role: "region", "aria-label": this.caption ? `${this.caption} table` : 'Data table' }, index.h("table", { key: '99fee1c9de4aea86168d76f9fe4b7c5fe479b53e', class: "fb-dt-table", role: "grid", "aria-label": this.caption || 'Data table' }, index.h("thead", { key: '2598c67535933e509d040cc9bf51c37ace2c5414' }, index.h("tr", { key: 'ba788cf0043ad28e08aef4f6e151166fbdcf6968' }, showCbs && (index.h("th", { key: '449a20c7255fce8b3ef6879d3413189eaea2564b', scope: "col", class: "fb-dt-th fb-dt-th--cb" }, this.renderCheckbox(this._allPageSelected, this._somePageSelected, this.toggleAll, 'Select all rows'))), cols.map(col => (index.h("th", { key: col.key, scope: "col", class: {
                'fb-dt-th': true,
                'fb-dt-th--sortable': !!col.sortable,
                'fb-dt-th--right': col.align === 'right',
            }, "aria-sort": col.sortable
                ? (this.sortCol === col.key
                    ? (this.sortDir === 'asc' ? 'ascending' : 'descending')
                    : 'none')
                : undefined, tabIndex: col.sortable ? 0 : -1, onClick: () => col.sortable && this.toggleSort(col.key), onKeyDown: e => {
                if ((e.key === 'Enter' || e.key === ' ') && col.sortable) {
                    e.preventDefault();
                    this.toggleSort(col.key);
                }
            } }, index.h("div", { class: { 'fb-dt-th-inner': true, 'fb-dt-th-inner--right': col.align === 'right' } }, col.align === 'right' && col.sortable && this.renderSortIcon(col.key), index.h("span", null, col.label), col.align !== 'right' && col.sortable && this.renderSortIcon(col.key))))), showAct && (index.h("th", { key: 'd9cc2e336102f08ccf2d5df8d92110e89fdc1815', scope: "col", class: "fb-dt-th fb-dt-th--actions", "aria-label": "Row actions" })))), index.h("tbody", { key: '34708ddf51af085cf11a49aef31be0497e250e4c' }, pagRows.length === 0
            ? (index.h("tr", null, index.h("td", { class: "fb-dt-td fb-dt-td--empty", colSpan: colSpan }, "No results found.")))
            : pagRows.map((row, rowIdx) => {
                var _a, _b;
                const isLast = rowIdx === pagRows.length - 1;
                const isSel = this.selected.has(row.id);
                return (index.h("tr", { key: row.id, class: {
                        'fb-dt-row': true,
                        'fb-dt-row--selected': isSel,
                        'fb-dt-row--clickable': this.clickable,
                        'fb-dt-row--last': isLast,
                        'fb-dt-row--compact': this.density === 'compact',
                    }, tabIndex: this.clickable ? 0 : undefined, onClick: () => {
                        if (this.clickable)
                            this.fbRowClick.emit(row);
                    }, onKeyDown: e => {
                        if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            this.fbRowClick.emit(row);
                        }
                    } }, showCbs && (index.h("td", { class: { 'fb-dt-td': true, 'fb-dt-td--cb': true, 'fb-dt-td--last': isLast } }, this.renderCheckbox(isSel, false, () => this.toggleRow(row.id), `Select ${(_a = row.name) !== null && _a !== void 0 ? _a : row.id}`))), cols.map(col => (index.h("td", { key: col.key, class: {
                        'fb-dt-td': true,
                        'fb-dt-td--right': col.align === 'right',
                        'fb-dt-td--muted': col.type !== 'badge' && col.type !== 'currency' && col.key === 'email',
                        'fb-dt-td--bold': col.type === 'currency',
                        'fb-dt-td--last': isLast,
                    } }, this.renderCell(col, row)))), showAct && (index.h("td", { class: { 'fb-dt-td': true, 'fb-dt-td--actions': true, 'fb-dt-td--last': isLast } }, index.h("button", { class: { 'fb-dt-action-btn': true, 'is-open': this.openActionRowId === row.id }, "aria-label": `Open actions for ${(_b = row.name) !== null && _b !== void 0 ? _b : row.id}`, "aria-haspopup": "menu", "aria-expanded": this.openActionRowId === row.id ? 'true' : 'false', onClick: e => this.openActionMenu(row.id, e) }, index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, index.h("circle", { cx: "4", cy: "8", r: "1.2", fill: "currentColor" }), index.h("circle", { cx: "8", cy: "8", r: "1.2", fill: "currentColor" }), index.h("circle", { cx: "12", cy: "8", r: "1.2", fill: "currentColor" })))))));
            }))))), showFooter && (index.h("div", { key: 'ede77296ec00dccff1e77c7490c47331e9816c4d', class: "fb-dt-footer" }, index.h("span", { key: '019a27e6e99a626c830f7a94397f82c13f417676', class: "fb-dt-row-count" }, !this.hideRowCount && `${this.selected.size} of ${this._filteredRows.length} row(s) selected`), index.h("div", { key: '3527befcdcb20af73b93e0cd28ee78a9e7b0a239', class: "fb-dt-footer-center" }, !this.hidePagination && this.renderPagination()), index.h("div", { key: '9b5ed61d1820b3170f2a3ebd657eeb0dab01611d', class: "fb-dt-footer-right" }, !this.hideRowsPerPage && (index.h("div", { key: 'd3cff6e75755fdd8b07935ddf25f375ea084d21b', class: "fb-dt-rpp" }, index.h("span", { key: '99bdf666842ce149c1a6199c7376fde77ae09b0a', class: "fb-dt-rpp-label" }, "Rows per page"), index.h("div", { key: 'ba436fd49ad1d7ee708c69b90b7b4a7c7572ff4f', class: "fb-dt-rpp-wrap" }, index.h("button", { key: '8814c7e7a1589580dd0701e23bf12a2b60d5c80f', class: { 'fb-dt-rpp-btn': true, 'is-open': this.rppMenuOpen }, "aria-haspopup": "listbox", "aria-expanded": this.rppMenuOpen ? 'true' : 'false', onClick: this.toggleRppMenu }, index.h("span", { key: 'e75d3db478d5fe334a3f240c0386ff9f973c6a5a' }, this.pageSize), index.h("svg", { key: '043b74513081a05f9f11e9f51e69be8aefd49ff6', width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", style: { transform: this.rppMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' } }, index.h("path", { key: 'e7ccdfa8af072ea291c455fa7204cc58dac7d9ab', d: "M4 6l4 4 4-4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }))), this.rppMenuOpen && (index.h("div", { key: '6e75c635f3f1e0dc51fcc6432ba8fd312c57f5eb', class: "fb-dt-rpp-menu", role: "listbox", "aria-label": "Rows per page" }, RPP_OPTIONS.map(opt => (index.h("div", { key: opt, class: { 'fb-dt-rpp-opt': true, 'fb-dt-rpp-opt--active': opt === this.pageSize }, role: "option", "aria-selected": opt === this.pageSize ? 'true' : 'false', onClick: () => this.setPageSize(opt) }, opt, opt === this.pageSize && (index.h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 14 14", fill: "none" }, index.h("path", { d: "M2 7l3.5 3.5L12 3", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })))))))))))))), this.openActionRowId !== null && (index.h("div", { key: '634ff588bcdbd319a5d118e7e132d16cb710925e', class: "fb-dt-action-menu", role: "menu", "aria-label": "Row actions", style: { top: `${this.actionMenuPos.top}px`, left: `${this.actionMenuPos.left}px` } }, this._parsedRowActions.map((action, i) => {
            if (action.separator)
                return index.h("div", { key: `sep${i}`, class: "fb-dt-action-sep", role: "separator" });
            if (action.labelGroup)
                return index.h("div", { key: `lbl${i}`, class: "fb-dt-action-lbl" }, action.labelGroup);
            return (index.h("div", { key: action.id, class: { 'fb-dt-action-item': true, 'fb-dt-action-item--danger': action.variant === 'danger' }, role: "menuitem", tabIndex: 0, onClick: () => this.fireAction(action.id, this.openActionRowId), onKeyDown: e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.fireAction(action.id, this.openActionRowId);
                    }
                } }, action.label));
        }))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "columns": [{
                "onColumnsChange": 0
            }]
    }; }
};
FbDataTable.style = fbDataTableCss();

exports.fb_data_table = FbDataTable;
