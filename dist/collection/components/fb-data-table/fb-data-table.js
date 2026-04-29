import { h, Host } from "@stencil/core";
function titleCase(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
let dtCounter = 0;
const RPP_OPTIONS = [5, 10, 25, 50];
export class FbDataTable {
    constructor() {
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
        dtCounter++;
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
                return h("fb-badge", { variant: variant }, label);
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
        return (h("nav", { class: "fb-dt-pager", "aria-label": "Pagination" }, h("button", { class: { 'fb-dt-pager-nav': true, 'fb-dt-pager-nav--disabled': cur <= 1 }, disabled: cur <= 1, "aria-label": "Previous page", onClick: () => cur > 1 && this.onPageChange(cur - 1) }, h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M10 3L5 8l5 5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })), "Previous"), h("div", { class: "fb-dt-pager-pages" }, pages.map((p, i) => p === '...'
            ? h("span", { class: "fb-dt-pager-ellipsis", key: `e${i}` }, "\u00B7\u00B7\u00B7")
            : h("button", { key: p, class: { 'fb-dt-pager-page': true, 'fb-dt-pager-page--active': p === cur }, "aria-label": `Page ${p}`, "aria-current": p === cur ? 'page' : undefined, onClick: () => this.onPageChange(p) }, p))), h("button", { class: { 'fb-dt-pager-nav': true, 'fb-dt-pager-nav--disabled': cur >= total }, disabled: cur >= total, "aria-label": "Next page", onClick: () => cur < total && this.onPageChange(cur + 1) }, "Next", h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M6 3l5 5-5 5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })))));
    }
    // ── Checkbox ─────────────────────────────────────────────────────────────
    renderCheckbox(checked, indeterminate, onChange, label) {
        return (h("div", { class: {
                'fb-dt-cb': true,
                'fb-dt-cb--checked': checked && !indeterminate,
                'fb-dt-cb--indeterminate': indeterminate,
            }, role: "checkbox", "aria-checked": indeterminate ? 'mixed' : (checked ? 'true' : 'false'), "aria-label": label, tabIndex: 0, onClick: onChange, onKeyDown: e => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onChange();
                }
            } }, checked && !indeterminate && (h("svg", { "aria-hidden": "true", width: "10", height: "10", viewBox: "0 0 10 10", fill: "none" }, h("path", { d: "M2 5l2.5 2.5L8 3", stroke: "white", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }))), indeterminate && h("div", { class: "fb-dt-cb-dash" })));
    }
    // ── Sort icon ─────────────────────────────────────────────────────────────
    renderSortIcon(colKey) {
        const dir = this.sortCol === colKey ? this.sortDir : null;
        if (dir === 'asc')
            return (h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", class: "fb-dt-sort-icon" }, h("path", { d: "M8 3v10M4 7l4-4 4 4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })));
        if (dir === 'desc')
            return (h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", class: "fb-dt-sort-icon" }, h("path", { d: "M8 3v10M4 9l4 4 4-4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })));
        return (h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", class: "fb-dt-sort-icon fb-dt-sort-icon--inactive" }, h("path", { d: "M5 6l3-3 3 3M5 10l3 3 3-3", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round", opacity: "0.4" })));
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
        return (h(Host, { key: '43476da5e4a6eca6afacf773dfc0de14c81c602b' }, h("div", { key: '89c869a83298eaa77a271b9241a475ad399a0219', class: "fb-dt-wrapper" }, !this.hideToolbar && (h("div", { key: '9c5a5b304894badf5fe884ceea1f9174c1e8cfc6', class: "fb-dt-toolbar" }, h("input", { key: '44e51f625abe33af90d0f871ea651e0961e941b4', class: "fb-dt-filter", type: "search", placeholder: "Filter by name or email\u2026", value: this.filter, "aria-label": "Filter rows", onInput: this.onFilterInput }), h("div", { key: '3459c0f3dada8898af5f4f1101748a548ea7227e', class: "fb-dt-col-wrap" }, h("button", { key: '0c0c2ebd78432b56b8addd806cf72bb04c40fe8f', class: { 'fb-dt-col-btn': true, 'is-open': this.colMenuOpen }, "aria-haspopup": "true", "aria-expanded": this.colMenuOpen ? 'true' : 'false', onClick: e => { e.stopPropagation(); this.colMenuOpen = !this.colMenuOpen; this.rppMenuOpen = false; } }, h("svg", { key: '1fd6ce1dec961e40476b5ebf2af3883751d98d69', "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 14 14", fill: "none" }, h("rect", { key: '8c1210539d7e45ecaa847a666afc434134ac19b7', x: "1", y: "1", width: "12", height: "2.5", rx: "1", fill: "currentColor", opacity: "0.5" }), h("rect", { key: '4e85bcc97f0d9343fbe1e8b0606f12ed5c59742f', x: "1", y: "5.75", width: "12", height: "2.5", rx: "1", fill: "currentColor" }), h("rect", { key: '0e86b3afdb583032b1de8c99abd87b5b62ed939d', x: "1", y: "10.5", width: "8", height: "2.5", rx: "1", fill: "currentColor", opacity: "0.5" })), "Columns"), this.colMenuOpen && (h("div", { key: '43512f2d43945097269e3f5c47a65d1531b70ec0', class: "fb-dt-col-menu", role: "menu", "aria-label": "Toggle columns" }, allCols.map(col => (h("label", { class: "fb-dt-col-item", key: col.key }, h("input", { type: "checkbox", checked: this.colVisibility[col.key] !== false, onChange: () => {
                this.colVisibility = Object.assign(Object.assign({}, this.colVisibility), { [col.key]: !(this.colVisibility[col.key] !== false) });
            } }), col.label)))))))), this.caption && h("h3", { key: '451786ca135522bd83cc96b98334b368b6641948', class: "fb-dt-caption" }, this.caption), h("div", { key: 'e68100bfcd5db1ba3d60a27c11c544b45d056ed1', class: "fb-dt-table-wrap" }, h("div", { key: 'dfb327321b9b77861fc62101afc54bb001dbbf2d', class: "fb-dt-scroll", tabIndex: 0, role: "region", "aria-label": this.caption ? `${this.caption} table` : 'Data table' }, h("table", { key: '9ad69a312af38125ae7074c4b8a30fbf6c55f22e', class: "fb-dt-table", role: "grid", "aria-label": this.caption || 'Data table' }, h("thead", { key: '0f55898158f7b276ffae93e696552076201933a1' }, h("tr", { key: 'fac8da48217f458769697583c97e8502cbf05eb3' }, showCbs && (h("th", { key: '6e65bc2decc96177919356e690eb6f0db40bcdd0', scope: "col", class: "fb-dt-th fb-dt-th--cb" }, this.renderCheckbox(this._allPageSelected, this._somePageSelected, this.toggleAll, 'Select all rows'))), cols.map(col => (h("th", { key: col.key, scope: "col", class: {
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
            } }, h("div", { class: { 'fb-dt-th-inner': true, 'fb-dt-th-inner--right': col.align === 'right' } }, col.align === 'right' && col.sortable && this.renderSortIcon(col.key), h("span", null, col.label), col.align !== 'right' && col.sortable && this.renderSortIcon(col.key))))), showAct && (h("th", { key: '6d20595d329c943076e55860c1811c1cb01227ae', scope: "col", class: "fb-dt-th fb-dt-th--actions", "aria-label": "Row actions" })))), h("tbody", { key: 'fd11e7c8d8971ecd3341cfe3de638f5b60de21a1' }, pagRows.length === 0
            ? (h("tr", null, h("td", { class: "fb-dt-td fb-dt-td--empty", colSpan: colSpan }, "No results found.")))
            : pagRows.map((row, rowIdx) => {
                var _a, _b;
                const isLast = rowIdx === pagRows.length - 1;
                const isSel = this.selected.has(row.id);
                return (h("tr", { key: row.id, class: {
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
                    } }, showCbs && (h("td", { class: { 'fb-dt-td': true, 'fb-dt-td--cb': true, 'fb-dt-td--last': isLast } }, this.renderCheckbox(isSel, false, () => this.toggleRow(row.id), `Select ${(_a = row.name) !== null && _a !== void 0 ? _a : row.id}`))), cols.map(col => (h("td", { key: col.key, class: {
                        'fb-dt-td': true,
                        'fb-dt-td--right': col.align === 'right',
                        'fb-dt-td--muted': col.type !== 'badge' && col.type !== 'currency' && col.key === 'email',
                        'fb-dt-td--bold': col.type === 'currency',
                        'fb-dt-td--last': isLast,
                    } }, this.renderCell(col, row)))), showAct && (h("td", { class: { 'fb-dt-td': true, 'fb-dt-td--actions': true, 'fb-dt-td--last': isLast } }, h("button", { class: { 'fb-dt-action-btn': true, 'is-open': this.openActionRowId === row.id }, "aria-label": `Open actions for ${(_b = row.name) !== null && _b !== void 0 ? _b : row.id}`, "aria-haspopup": "menu", "aria-expanded": this.openActionRowId === row.id ? 'true' : 'false', onClick: e => this.openActionMenu(row.id, e) }, h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, h("circle", { cx: "4", cy: "8", r: "1.2", fill: "currentColor" }), h("circle", { cx: "8", cy: "8", r: "1.2", fill: "currentColor" }), h("circle", { cx: "12", cy: "8", r: "1.2", fill: "currentColor" })))))));
            }))))), showFooter && (h("div", { key: '36084e794d9252c3fc58ae7f2fee02ae1febc2c9', class: "fb-dt-footer" }, h("span", { key: 'bcfb2f920c391aa369e8140812ea4edc9cd5160d', class: "fb-dt-row-count" }, !this.hideRowCount && `${this.selected.size} of ${this._filteredRows.length} row(s) selected`), h("div", { key: '9ff54ae095f6aa2c916752eb205e95975e89b864', class: "fb-dt-footer-center" }, !this.hidePagination && this.renderPagination()), h("div", { key: '52d4637edf3fadc993cda0f1756cb5d8027f5d90', class: "fb-dt-footer-right" }, !this.hideRowsPerPage && (h("div", { key: 'ceb803a6c5ccc39463ec6e30a53fcd5fae992fb3', class: "fb-dt-rpp" }, h("span", { key: '90e389807d8cdd4773fcc47386e22b620cc4a8c3', class: "fb-dt-rpp-label" }, "Rows per page"), h("div", { key: '42e26402e224b57605a170e067d49037836bc566', class: "fb-dt-rpp-wrap" }, h("button", { key: '8be1607d39cfcef220b2c211ed2f6a423684e34c', class: { 'fb-dt-rpp-btn': true, 'is-open': this.rppMenuOpen }, "aria-haspopup": "listbox", "aria-expanded": this.rppMenuOpen ? 'true' : 'false', onClick: this.toggleRppMenu }, h("span", { key: 'f054f4918a1968996261c210d98bf899363d7d65' }, this.pageSize), h("svg", { key: '0a0eb82a9c884cbe3687b50ffb1592e29b032963', width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", style: { transform: this.rppMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' } }, h("path", { key: '8bcee51bea0b05de48369e974d73688bdde7716e', d: "M4 6l4 4 4-4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }))), this.rppMenuOpen && (h("div", { key: '77f39bdb23573c6be05e6c55695b7ddb4ed69996', class: "fb-dt-rpp-menu", role: "listbox", "aria-label": "Rows per page" }, RPP_OPTIONS.map(opt => (h("div", { key: opt, class: { 'fb-dt-rpp-opt': true, 'fb-dt-rpp-opt--active': opt === this.pageSize }, role: "option", "aria-selected": opt === this.pageSize ? 'true' : 'false', onClick: () => this.setPageSize(opt) }, opt, opt === this.pageSize && (h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 14 14", fill: "none" }, h("path", { d: "M2 7l3.5 3.5L12 3", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })))))))))))))), this.openActionRowId !== null && (h("div", { key: '258cd574ee1d149697e6f44ec978608795036ee1', class: "fb-dt-action-menu", role: "menu", "aria-label": "Row actions", style: { top: `${this.actionMenuPos.top}px`, left: `${this.actionMenuPos.left}px` } }, this._parsedRowActions.map((action, i) => {
            if (action.separator)
                return h("div", { key: `sep${i}`, class: "fb-dt-action-sep", role: "separator" });
            if (action.labelGroup)
                return h("div", { key: `lbl${i}`, class: "fb-dt-action-lbl" }, action.labelGroup);
            return (h("div", { key: action.id, class: { 'fb-dt-action-item': true, 'fb-dt-action-item--danger': action.variant === 'danger' }, role: "menuitem", tabIndex: 0, onClick: () => this.fireAction(action.id, this.openActionRowId), onKeyDown: e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.fireAction(action.id, this.openActionRowId);
                    }
                } }, action.label));
        }))))));
    }
    static get is() { return "fb-data-table"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-data-table.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-data-table.css"]
        };
    }
    static get properties() {
        return {
            "columns": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "JSON array of column defs: [{key,label,sortable?,align?,type?,badgeMap?,labelMap?}]"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "columns",
                "defaultValue": "'[]'"
            },
            "rows": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "JSON array of row data objects \u2014 each row must have an `id` field"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "rows",
                "defaultValue": "'[]'"
            },
            "caption": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Table caption / aria-label"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "caption",
                "defaultValue": "''"
            },
            "rowActions": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "JSON array of row actions: [{id,label,variant?,separator?,labelGroup?}]"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "row-actions",
                "defaultValue": "''"
            },
            "density": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'default' | 'compact'",
                    "resolved": "\"compact\" | \"default\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Row density"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "density",
                "defaultValue": "'default'"
            },
            "clickable": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When true, rows are clickable; hides checkboxes and action buttons"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "clickable",
                "defaultValue": "false"
            },
            "hideToolbar": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hide the filter + columns-toggle toolbar"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "hide-toolbar",
                "defaultValue": "false"
            },
            "hideCheckboxes": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hide row-selection checkboxes"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "hide-checkboxes",
                "defaultValue": "false"
            },
            "hidePagination": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hide pagination bar"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "hide-pagination",
                "defaultValue": "false"
            },
            "hideRowsPerPage": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hide rows-per-page selector"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "hide-rows-per-page",
                "defaultValue": "false"
            },
            "hideRowCount": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hide selected-row count label"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "hide-row-count",
                "defaultValue": "false"
            },
            "initialPageSize": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Initial page size"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "initial-page-size",
                "defaultValue": "5"
            }
        };
    }
    static get states() {
        return {
            "filter": {},
            "sortCol": {},
            "sortDir": {},
            "selected": {},
            "page": {},
            "pageSize": {},
            "colVisibility": {},
            "colMenuOpen": {},
            "openActionRowId": {},
            "actionMenuPos": {},
            "rppMenuOpen": {}
        };
    }
    static get events() {
        return [{
                "method": "fbRowClick",
                "name": "fbRowClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when a row is clicked (clickable mode): detail = row object"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "fbSelectionChange",
                "name": "fbSelectionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when selection changes: detail = array of selected row IDs"
                },
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                }
            }, {
                "method": "fbSortChange",
                "name": "fbSortChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when column sort changes: detail = {col, dir}"
                },
                "complexType": {
                    "original": "{ col: string; dir: string }",
                    "resolved": "{ col: string; dir: string; }",
                    "references": {}
                }
            }, {
                "method": "fbFilterChange",
                "name": "fbFilterChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when filter input changes: detail = filter string"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "fbActionClick",
                "name": "fbActionClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when a row action is selected: detail = {actionId, row}"
                },
                "complexType": {
                    "original": "{ actionId: string; row: any }",
                    "resolved": "{ actionId: string; row: any; }",
                    "references": {}
                }
            }, {
                "method": "fbPageChange",
                "name": "fbPageChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when the page changes: detail = page number"
                },
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "columns",
                "methodName": "onColumnsChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onDocumentClick",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
