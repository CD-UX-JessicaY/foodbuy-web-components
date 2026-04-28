import { Component, Prop, State, Event, EventEmitter, Element, Listen, Watch, h, Host } from '@stencil/core';

// ── Types ──────────────────────────────────────────────────────────────────

interface ColumnDef {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  /** 'badge' → renders fb-badge; 'currency' → USD format; default → plain text */
  type?: 'text' | 'badge' | 'currency';
  /** Maps cell value → badge variant string */
  badgeMap?: Record<string, string>;
  /** Maps cell value → display label (falls back to title-case of value) */
  labelMap?: Record<string, string>;
  hidden?: boolean;
}

interface RowAction {
  id?: string;
  label?: string;
  variant?: 'default' | 'danger';
  separator?: boolean;
  labelGroup?: string;
}

function titleCase(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

let dtCounter = 0;
const RPP_OPTIONS = [5, 10, 25, 50];

@Component({
  tag: 'fb-data-table',
  styleUrl: 'fb-data-table.css',
  shadow: true,
})
export class FbDataTable {
  @Element() el!: HTMLElement;

  /** JSON array of column defs: [{key,label,sortable?,align?,type?,badgeMap?,labelMap?}] */
  @Prop() columns: string = '[]';
  /** JSON array of row data objects — each row must have an `id` field */
  @Prop() rows: string = '[]';
  /** Table caption / aria-label */
  @Prop() caption: string = '';
  /** JSON array of row actions: [{id,label,variant?,separator?,labelGroup?}] */
  @Prop() rowActions: string = '';
  /** Row density */
  @Prop() density: 'default' | 'compact' = 'default';
  /** When true, rows are clickable; hides checkboxes and action buttons */
  @Prop() clickable: boolean = false;
  /** Hide the filter + columns-toggle toolbar */
  @Prop() hideToolbar: boolean = false;
  /** Hide row-selection checkboxes */
  @Prop() hideCheckboxes: boolean = false;
  /** Hide pagination bar */
  @Prop() hidePagination: boolean = false;
  /** Hide rows-per-page selector */
  @Prop() hideRowsPerPage: boolean = false;
  /** Hide selected-row count label */
  @Prop() hideRowCount: boolean = false;
  /** Initial page size */
  @Prop() initialPageSize: number = 5;

  /** Fires when a row is clicked (clickable mode): detail = row object */
  @Event() fbRowClick: EventEmitter<any>;
  /** Fires when selection changes: detail = array of selected row IDs */
  @Event() fbSelectionChange: EventEmitter<string[]>;
  /** Fires when column sort changes: detail = {col, dir} */
  @Event() fbSortChange: EventEmitter<{ col: string; dir: string }>;
  /** Fires when filter input changes: detail = filter string */
  @Event() fbFilterChange: EventEmitter<string>;
  /** Fires when a row action is selected: detail = {actionId, row} */
  @Event() fbActionClick: EventEmitter<{ actionId: string; row: any }>;
  /** Fires when the page changes: detail = page number */
  @Event() fbPageChange: EventEmitter<number>;

  @State() filter: string = '';
  @State() sortCol: string = '';
  @State() sortDir: 'asc' | 'desc' = 'asc';
  @State() selected: Set<string> = new Set();
  @State() page: number = 1;
  @State() pageSize: number = 5;
  @State() colVisibility: Record<string, boolean> = {};
  @State() colMenuOpen: boolean = false;
  @State() openActionRowId: string | null = null;
  @State() actionMenuPos: { top: number; left: number } = { top: 0, left: 0 };
  @State() rppMenuOpen: boolean = false;

  connectedCallback() {
    dtCounter++;
    this.pageSize = this.initialPageSize > 0 ? this.initialPageSize : 5;
    this._initColVisibility();
  }

  @Watch('columns')
  onColumnsChange() { this._initColVisibility(); }

  private _initColVisibility() {
    const vis: Record<string, boolean> = { ...this.colVisibility };
    this._parsedColumns.forEach(c => {
      if (!(c.key in vis)) vis[c.key] = !c.hidden;
    });
    this.colVisibility = vis;
  }

  @Listen('click', { target: 'document' })
  onDocumentClick(e: MouseEvent) {
    if (!this.el.contains(e.target as Node)) {
      this.colMenuOpen = false;
      this.openActionRowId = null;
      this.rppMenuOpen = false;
    }
  }

  // ── Parsed props ─────────────────────────────────────────────────────────

  private get _parsedColumns(): ColumnDef[] {
    try {
      const c = typeof this.columns === 'string' ? JSON.parse(this.columns) : this.columns;
      return Array.isArray(c) ? c : [];
    } catch { return []; }
  }

  private get _parsedRows(): any[] {
    try {
      const r = typeof this.rows === 'string' ? JSON.parse(this.rows) : this.rows;
      return Array.isArray(r) ? r : [];
    } catch { return []; }
  }

  private get _parsedRowActions(): RowAction[] {
    if (!this.rowActions) return [];
    try {
      const a = typeof this.rowActions === 'string' ? JSON.parse(this.rowActions) : this.rowActions;
      return Array.isArray(a) ? a : [];
    } catch { return []; }
  }

  private get _visibleColumns(): ColumnDef[] {
    return this._parsedColumns.filter(c => this.colVisibility[c.key] !== false);
  }

  // ── Data processing ──────────────────────────────────────────────────────

  private get _filteredRows(): any[] {
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

  private get _totalPages(): number {
    return Math.max(1, Math.ceil(this._filteredRows.length / this.pageSize));
  }

  private get _paginatedRows(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this._filteredRows.slice(start, start + this.pageSize);
  }

  // ── Selection ────────────────────────────────────────────────────────────

  private get _allPageSelected(): boolean {
    const pg = this._paginatedRows;
    return pg.length > 0 && pg.every(r => this.selected.has(r.id));
  }

  private get _somePageSelected(): boolean {
    return this._paginatedRows.some(r => this.selected.has(r.id)) && !this._allPageSelected;
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  private toggleSort = (col: string) => {
    if (this.sortCol === col) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCol = col;
      this.sortDir = 'asc';
    }
    this.page = 1;
    this.fbSortChange.emit({ col, dir: this.sortDir });
  };

  private toggleRow = (id: string) => {
    const s = new Set(this.selected);
    s.has(id) ? s.delete(id) : s.add(id);
    this.selected = s;
    this.fbSelectionChange.emit([...s]);
  };

  private toggleAll = () => {
    const s = new Set(this.selected);
    if (this._allPageSelected) {
      this._paginatedRows.forEach(r => s.delete(r.id));
    } else {
      this._paginatedRows.forEach(r => s.add(r.id));
    }
    this.selected = s;
    this.fbSelectionChange.emit([...s]);
  };

  private onFilterInput = (e: InputEvent) => {
    const val = (e.target as HTMLInputElement).value;
    this.filter = val;
    this.page = 1;
    this.fbFilterChange.emit(val);
  };

  private onPageChange = (p: number) => {
    this.page = p;
    this.fbPageChange.emit(p);
  };

  private openActionMenu = (rowId: string, e: MouseEvent) => {
    e.stopPropagation();
    if (this.openActionRowId === rowId) {
      this.openActionRowId = null;
      return;
    }
    const btn = e.currentTarget as HTMLElement;
    const btnRect  = btn.getBoundingClientRect();
    const hostRect = this.el.getBoundingClientRect();
    this.actionMenuPos = {
      top:  btnRect.bottom - hostRect.top + 4,
      left: Math.max(0, btnRect.right - hostRect.left - 180),
    };
    this.openActionRowId = rowId;
  };

  private fireAction = (actionId: string, rowId: string) => {
    const row = this._parsedRows.find(r => r.id === rowId);
    this.fbActionClick.emit({ actionId, row });
    this.openActionRowId = null;
  };

  private toggleRppMenu = (e: MouseEvent) => {
    e.stopPropagation();
    this.rppMenuOpen = !this.rppMenuOpen;
    this.colMenuOpen = false;
  };

  private setPageSize = (size: number) => {
    this.pageSize = size;
    this.page = 1;
    this.rppMenuOpen = false;
  };

  // ── Cell renderer ────────────────────────────────────────────────────────

  private renderCell(col: ColumnDef, row: any) {
    const val = row[col.key];
    if (val === undefined || val === null) return '';
    switch (col.type) {
      case 'badge': {
        const variant = (col.badgeMap && col.badgeMap[val]) ?? String(val);
        const label   = (col.labelMap && col.labelMap[val]) ?? titleCase(String(val));
        return <fb-badge variant={variant as any}>{label}</fb-badge>;
      }
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(val));
      default:
        return String(val);
    }
  }

  // ── Pagination ───────────────────────────────────────────────────────────

  private renderPagination() {
    const total = this._totalPages;
    const cur   = this.page;
    const pages: (number | '...')[] = [];

    const range: number[] = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= cur - 1 && i <= cur + 1)) range.push(i);
    }
    let prev: number | undefined;
    for (const p of range) {
      if (prev !== undefined && p - prev > 1) pages.push('...');
      pages.push(p);
      prev = p;
    }

    return (
      <nav class="fb-dt-pager" aria-label="Pagination">
        <button
          class={{ 'fb-dt-pager-nav': true, 'fb-dt-pager-nav--disabled': cur <= 1 }}
          disabled={cur <= 1}
          aria-label="Previous page"
          onClick={() => cur > 1 && this.onPageChange(cur - 1)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Previous
        </button>
        <div class="fb-dt-pager-pages">
          {pages.map((p, i) =>
            p === '...'
              ? <span class="fb-dt-pager-ellipsis" key={`e${i}`}>···</span>
              : <button
                  key={p}
                  class={{ 'fb-dt-pager-page': true, 'fb-dt-pager-page--active': p === cur }}
                  aria-label={`Page ${p}`}
                  aria-current={p === cur ? 'page' : undefined}
                  onClick={() => this.onPageChange(p as number)}
                >{p}</button>
          )}
        </div>
        <button
          class={{ 'fb-dt-pager-nav': true, 'fb-dt-pager-nav--disabled': cur >= total }}
          disabled={cur >= total}
          aria-label="Next page"
          onClick={() => cur < total && this.onPageChange(cur + 1)}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </nav>
    );
  }

  // ── Checkbox ─────────────────────────────────────────────────────────────

  private renderCheckbox(checked: boolean, indeterminate: boolean, onChange: () => void, label: string) {
    return (
      <div
        class={{
          'fb-dt-cb': true,
          'fb-dt-cb--checked':       checked && !indeterminate,
          'fb-dt-cb--indeterminate': indeterminate,
        }}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : (checked ? 'true' : 'false')}
        aria-label={label}
        tabIndex={0}
        onClick={onChange}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange(); } }}
      >
        {checked && !indeterminate && (
          <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        )}
        {indeterminate && <div class="fb-dt-cb-dash" />}
      </div>
    );
  }

  // ── Sort icon ─────────────────────────────────────────────────────────────

  private renderSortIcon(colKey: string) {
    const dir = this.sortCol === colKey ? this.sortDir : null;
    if (dir === 'asc') return (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" class="fb-dt-sort-icon">
        <path d="M8 3v10M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
    if (dir === 'desc') return (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" class="fb-dt-sort-icon">
        <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
    return (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" class="fb-dt-sort-icon fb-dt-sort-icon--inactive">
        <path d="M5 6l3-3 3 3M5 10l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
      </svg>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  render() {
    const cols      = this._visibleColumns;
    const allCols   = this._parsedColumns;
    const pagRows   = this._paginatedRows;
    const actions   = this._parsedRowActions;
    const showCbs   = !this.clickable && !this.hideCheckboxes;
    const showAct   = !this.clickable && actions.length > 0;
    const colSpan   = cols.length + (showCbs ? 1 : 0) + (showAct ? 1 : 0);
    const showFooter = !this.hideRowCount || !this.hidePagination || !this.hideRowsPerPage;

    return (
      <Host>
        <div class="fb-dt-wrapper">

          {/* ── Toolbar ────────────────────────────────────────────── */}
          {!this.hideToolbar && (
            <div class="fb-dt-toolbar">
              <input
                class="fb-dt-filter"
                type="search"
                placeholder="Filter by name or email…"
                value={this.filter}
                aria-label="Filter rows"
                onInput={this.onFilterInput}
              />
              <div class="fb-dt-col-wrap">
                <button
                  class={{ 'fb-dt-col-btn': true, 'is-open': this.colMenuOpen }}
                  aria-haspopup="true"
                  aria-expanded={this.colMenuOpen ? 'true' : 'false'}
                  onClick={e => { e.stopPropagation(); this.colMenuOpen = !this.colMenuOpen; this.rppMenuOpen = false; }}
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1"    width="12" height="2.5" rx="1" fill="currentColor" opacity="0.5"/>
                    <rect x="1" y="5.75" width="12" height="2.5" rx="1" fill="currentColor"/>
                    <rect x="1" y="10.5" width="8"  height="2.5" rx="1" fill="currentColor" opacity="0.5"/>
                  </svg>
                  Columns
                </button>
                {this.colMenuOpen && (
                  <div class="fb-dt-col-menu" role="menu" aria-label="Toggle columns">
                    {allCols.map(col => (
                      <label class="fb-dt-col-item" key={col.key}>
                        <input
                          type="checkbox"
                          checked={this.colVisibility[col.key] !== false}
                          onChange={() => {
                            this.colVisibility = { ...this.colVisibility, [col.key]: !(this.colVisibility[col.key] !== false) };
                          }}
                        />
                        {col.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Caption ────────────────────────────────────────────── */}
          {this.caption && <h3 class="fb-dt-caption">{this.caption}</h3>}

          {/* ── Table ──────────────────────────────────────────────── */}
          <div class="fb-dt-table-wrap">
            {/* tabIndex="0" makes the scroll region keyboard-focusable — WCAG 2.1 SC 2.1.1 */}
            <div class="fb-dt-scroll" tabIndex={0} role="region" aria-label={this.caption ? `${this.caption} table` : 'Data table'}>
              <table class="fb-dt-table" role="grid" aria-label={this.caption || 'Data table'}>
                <thead>
                  <tr>
                    {showCbs && (
                      <th scope="col" class="fb-dt-th fb-dt-th--cb">
                        {this.renderCheckbox(this._allPageSelected, this._somePageSelected, this.toggleAll, 'Select all rows')}
                      </th>
                    )}
                    {cols.map(col => (
                      <th
                        key={col.key}
                        scope="col"
                        class={{
                          'fb-dt-th': true,
                          'fb-dt-th--sortable': !!col.sortable,
                          'fb-dt-th--right':    col.align === 'right',
                        }}
                        aria-sort={col.sortable
                          ? (this.sortCol === col.key
                              ? (this.sortDir === 'asc' ? 'ascending' : 'descending')
                              : 'none')
                          : undefined}
                        tabIndex={col.sortable ? 0 : -1}
                        onClick={() => col.sortable && this.toggleSort(col.key)}
                        onKeyDown={e => {
                          if ((e.key === 'Enter' || e.key === ' ') && col.sortable) {
                            e.preventDefault(); this.toggleSort(col.key);
                          }
                        }}
                      >
                        <div class={{ 'fb-dt-th-inner': true, 'fb-dt-th-inner--right': col.align === 'right' }}>
                          {col.align === 'right' && col.sortable && this.renderSortIcon(col.key)}
                          <span>{col.label}</span>
                          {col.align !== 'right' && col.sortable && this.renderSortIcon(col.key)}
                        </div>
                      </th>
                    ))}
                    {showAct && (
                      <th scope="col" class="fb-dt-th fb-dt-th--actions" aria-label="Row actions" />
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pagRows.length === 0
                    ? (
                      <tr>
                        <td class="fb-dt-td fb-dt-td--empty" colSpan={colSpan}>
                          No results found.
                        </td>
                      </tr>
                    )
                    : pagRows.map((row, rowIdx) => {
                      const isLast = rowIdx === pagRows.length - 1;
                      const isSel  = this.selected.has(row.id);
                      return (
                        <tr
                          key={row.id}
                          class={{
                            'fb-dt-row': true,
                            'fb-dt-row--selected':  isSel,
                            'fb-dt-row--clickable': this.clickable,
                            'fb-dt-row--last':      isLast,
                            'fb-dt-row--compact':   this.density === 'compact',
                          }}
                          tabIndex={this.clickable ? 0 : undefined}
                          onClick={() => { if (this.clickable) this.fbRowClick.emit(row); }}
                          onKeyDown={e => {
                            if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
                              e.preventDefault(); this.fbRowClick.emit(row);
                            }
                          }}
                        >
                          {showCbs && (
                            <td class={{ 'fb-dt-td': true, 'fb-dt-td--cb': true, 'fb-dt-td--last': isLast }}>
                              {this.renderCheckbox(isSel, false, () => this.toggleRow(row.id), `Select ${row.name ?? row.id}`)}
                            </td>
                          )}
                          {cols.map(col => (
                            <td
                              key={col.key}
                              class={{
                                'fb-dt-td': true,
                                'fb-dt-td--right':  col.align === 'right',
                                'fb-dt-td--muted':  col.type !== 'badge' && col.type !== 'currency' && col.key === 'email',
                                'fb-dt-td--bold':   col.type === 'currency',
                                'fb-dt-td--last':   isLast,
                              }}
                            >
                              {this.renderCell(col, row)}
                            </td>
                          ))}
                          {showAct && (
                            <td class={{ 'fb-dt-td': true, 'fb-dt-td--actions': true, 'fb-dt-td--last': isLast }}>
                              <button
                                class={{ 'fb-dt-action-btn': true, 'is-open': this.openActionRowId === row.id }}
                                aria-label={`Open actions for ${row.name ?? row.id}`}
                                aria-haspopup="menu"
                                aria-expanded={this.openActionRowId === row.id ? 'true' : 'false'}
                                onClick={e => this.openActionMenu(row.id, e)}
                              >
                                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <circle cx="4"  cy="8" r="1.2" fill="currentColor"/>
                                  <circle cx="8"  cy="8" r="1.2" fill="currentColor"/>
                                  <circle cx="12" cy="8" r="1.2" fill="currentColor"/>
                                </svg>
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Footer ─────────────────────────────────────────────── */}
          {showFooter && (
            <div class="fb-dt-footer">
              <span class="fb-dt-row-count">
                {!this.hideRowCount && `${this.selected.size} of ${this._filteredRows.length} row(s) selected`}
              </span>
              <div class="fb-dt-footer-center">
                {!this.hidePagination && this.renderPagination()}
              </div>
              <div class="fb-dt-footer-right">
                {!this.hideRowsPerPage && (
                  <div class="fb-dt-rpp">
                    <span class="fb-dt-rpp-label">Rows per page</span>
                    <div class="fb-dt-rpp-wrap">
                      <button
                        class={{ 'fb-dt-rpp-btn': true, 'is-open': this.rppMenuOpen }}
                        aria-haspopup="listbox"
                        aria-expanded={this.rppMenuOpen ? 'true' : 'false'}
                        onClick={this.toggleRppMenu}
                      >
                        <span>{this.pageSize}</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                             style={{ transform: this.rppMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      {this.rppMenuOpen && (
                        <div class="fb-dt-rpp-menu" role="listbox" aria-label="Rows per page">
                          {RPP_OPTIONS.map(opt => (
                            <div
                              key={opt}
                              class={{ 'fb-dt-rpp-opt': true, 'fb-dt-rpp-opt--active': opt === this.pageSize }}
                              role="option"
                              aria-selected={opt === this.pageSize ? 'true' : 'false'}
                              onClick={() => this.setPageSize(opt)}
                            >
                              {opt}
                              {opt === this.pageSize && (
                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Row-action menu overlay ─────────────────────────────── */}
          {this.openActionRowId !== null && (
            <div
              class="fb-dt-action-menu"
              role="menu"
              aria-label="Row actions"
              style={{ top: `${this.actionMenuPos.top}px`, left: `${this.actionMenuPos.left}px` }}
            >
              {this._parsedRowActions.map((action, i) => {
                if (action.separator)  return <div key={`sep${i}`}  class="fb-dt-action-sep" role="separator" />;
                if (action.labelGroup) return <div key={`lbl${i}`}  class="fb-dt-action-lbl">{action.labelGroup}</div>;
                return (
                  <div
                    key={action.id}
                    class={{ 'fb-dt-action-item': true, 'fb-dt-action-item--danger': action.variant === 'danger' }}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => this.fireAction(action.id!, this.openActionRowId!)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault(); this.fireAction(action.id!, this.openActionRowId!);
                      }
                    }}
                  >
                    {action.label}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </Host>
    );
  }
}
