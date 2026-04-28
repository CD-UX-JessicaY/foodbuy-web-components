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
        return (h(Host, { key: 'e5a5c417f048d8932f9384d99b9356baa4199215' }, h("div", { key: '4bc0189d9c1297f8498eefebe6ee6e23f447d125', class: "fb-dt-wrapper" }, !this.hideToolbar && (h("div", { key: '473cfc956bc93cdd054e3de305b279161b41703a', class: "fb-dt-toolbar" }, h("input", { key: 'd3b16d5f1d77407267a9593a8fb770ba51a07e2a', class: "fb-dt-filter", type: "search", placeholder: "Filter by name or email\u2026", value: this.filter, "aria-label": "Filter rows", onInput: this.onFilterInput }), h("div", { key: '1b49e583159f7f6c2e4117e61898993772261a6f', class: "fb-dt-col-wrap" }, h("button", { key: '9484a721d5daed28eafa9aa1bd5d99ee3ee4f409', class: { 'fb-dt-col-btn': true, 'is-open': this.colMenuOpen }, "aria-haspopup": "true", "aria-expanded": this.colMenuOpen ? 'true' : 'false', onClick: e => { e.stopPropagation(); this.colMenuOpen = !this.colMenuOpen; this.rppMenuOpen = false; } }, h("svg", { key: '301055c50e4ff5fc6b8a13260c468512ac172ae5', "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 14 14", fill: "none" }, h("rect", { key: 'e910bc0d3e0d17d5a8174d56ab59816f1ddf18d5', x: "1", y: "1", width: "12", height: "2.5", rx: "1", fill: "currentColor", opacity: "0.5" }), h("rect", { key: '34606f8d0051da0e0c9bcc3a687c1d3276a0bac0', x: "1", y: "5.75", width: "12", height: "2.5", rx: "1", fill: "currentColor" }), h("rect", { key: 'b806dd7aed3b350f533ed2ecc071261e3da4cd21', x: "1", y: "10.5", width: "8", height: "2.5", rx: "1", fill: "currentColor", opacity: "0.5" })), "Columns"), this.colMenuOpen && (h("div", { key: '1c31ff6724c42c0dc92630f09cd82eb302853ba3', class: "fb-dt-col-menu", role: "menu", "aria-label": "Toggle columns" }, allCols.map(col => (h("label", { class: "fb-dt-col-item", key: col.key }, h("input", { type: "checkbox", checked: this.colVisibility[col.key] !== false, onChange: () => {
                this.colVisibility = Object.assign(Object.assign({}, this.colVisibility), { [col.key]: !(this.colVisibility[col.key] !== false) });
            } }), col.label)))))))), this.caption && h("h3", { key: 'ca7e1b1051bc852e1dc1e43cb188e0fa130e70f1', class: "fb-dt-caption" }, this.caption), h("div", { key: 'b1912981db40b8efd6747d2d87f684812f299aa1', class: "fb-dt-table-wrap" }, h("div", { key: '348e1f0b28e44baac897f78fccbdc5cb7dca7c3d', class: "fb-dt-scroll" }, h("table", { key: 'ba2b06079f8baefa1dca4b6e145f2ef95f140c3f', class: "fb-dt-table", role: "grid", "aria-label": this.caption || 'Data table' }, h("thead", { key: 'e18fc9db18ea8bf9f39cffc8b01a7c08f2c58b46' }, h("tr", { key: '6b6ec7db7e8a5439a3c57812e5acf44ff2ca4e78' }, showCbs && (h("th", { key: '22806719add273ac33c0ecb73b41a9a5cd2a4202', scope: "col", class: "fb-dt-th fb-dt-th--cb" }, this.renderCheckbox(this._allPageSelected, this._somePageSelected, this.toggleAll, 'Select all rows'))), cols.map(col => (h("th", { key: col.key, scope: "col", class: {
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
            } }, h("div", { class: { 'fb-dt-th-inner': true, 'fb-dt-th-inner--right': col.align === 'right' } }, col.align === 'right' && col.sortable && this.renderSortIcon(col.key), h("span", null, col.label), col.align !== 'right' && col.sortable && this.renderSortIcon(col.key))))), showAct && (h("th", { key: '9fba4707ca1ce70acde7b12d4fca5acfbcba85e1', scope: "col", class: "fb-dt-th fb-dt-th--actions", "aria-label": "Row actions" })))), h("tbody", { key: '920505f42ff98638d49d55ebf7f50b4e4b7e59bf' }, pagRows.length === 0
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
            }))))), showFooter && (h("div", { key: 'a3285e5c785b857378cf135b4e3a5e474cc3c195', class: "fb-dt-footer" }, h("span", { key: '20687c697a9962e3d804e4178a6bc251f8842a39', class: "fb-dt-row-count" }, !this.hideRowCount && `${this.selected.size} of ${this._filteredRows.length} row(s) selected`), h("div", { key: '0610c21ed44e2d37cad46b587898404e5f3010aa', class: "fb-dt-footer-center" }, !this.hidePagination && this.renderPagination()), h("div", { key: 'f36c5300a8ae1858f10278a82112960fc8c3a1a3', class: "fb-dt-footer-right" }, !this.hideRowsPerPage && (h("div", { key: '1de0c711feebb4b8512a107491b997db3570df18', class: "fb-dt-rpp" }, h("span", { key: '8ea4f7e55dafa3a7800a427e1fe9a5f4c19b1a54', class: "fb-dt-rpp-label" }, "Rows per page"), h("div", { key: '4cf7ac3ae5fa796099269a45655300483fae71e8', class: "fb-dt-rpp-wrap" }, h("button", { key: '82f78f1dce63e5a6850267af99951558741c4bbb', class: { 'fb-dt-rpp-btn': true, 'is-open': this.rppMenuOpen }, "aria-haspopup": "listbox", "aria-expanded": this.rppMenuOpen ? 'true' : 'false', onClick: this.toggleRppMenu }, h("span", { key: 'a4231a2348cae61139fd1843a5389db23017d86c' }, this.pageSize), h("svg", { key: '2683039aced0287010ee8d2a89a590eaed9b0444', width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", style: { transform: this.rppMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' } }, h("path", { key: '58f106ba7ac446c5b7dd0365bbb506516226266a', d: "M4 6l4 4 4-4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }))), this.rppMenuOpen && (h("div", { key: '07b2fde2c6bf6d4ad91cf4c1f8f6f32ea2bc3446', class: "fb-dt-rpp-menu", role: "listbox", "aria-label": "Rows per page" }, RPP_OPTIONS.map(opt => (h("div", { key: opt, class: { 'fb-dt-rpp-opt': true, 'fb-dt-rpp-opt--active': opt === this.pageSize }, role: "option", "aria-selected": opt === this.pageSize ? 'true' : 'false', onClick: () => this.setPageSize(opt) }, opt, opt === this.pageSize && (h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 14 14", fill: "none" }, h("path", { d: "M2 7l3.5 3.5L12 3", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })))))))))))))), this.openActionRowId !== null && (h("div", { key: '1384c4e119385a2393bb3fe4666c7fc88531de0c', class: "fb-dt-action-menu", role: "menu", "aria-label": "Row actions", style: { top: `${this.actionMenuPos.top}px`, left: `${this.actionMenuPos.left}px` } }, this._parsedRowActions.map((action, i) => {
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
