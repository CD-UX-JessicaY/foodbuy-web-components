import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-CUJsYiXU.js';

const fbDatePickerCss = () => `:host{display:inline-block}.fb-dp-wrapper{display:inline-flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary)}.fb-label{font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-700);cursor:default}.required-indicator{color:var(--color-danger-500)}.fb-dp-container{position:relative;display:inline-block}.fb-dp-trigger{display:inline-flex;align-items:center;gap:var(--spacing-8);height:40px;padding:0 var(--spacing-12);font-family:var(--font-family-primary);font-size:var(--font-size-14);border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background:var(--color-neutral-white);cursor:pointer;text-align:left;transition:border-color 0.15s, box-shadow 0.15s;box-sizing:border-box;min-width:240px}.fb-dp-trigger.is-range{min-width:300px}.fb-dp-trigger:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-dp-trigger:hover:not(:disabled),.fb-dp-trigger.is-open{border-color:var(--color-primary-500)}.fb-dp-trigger.state-error{border-color:var(--color-danger-500);border-width:var(--border-thick)}.fb-dp-trigger.state-disabled{background:var(--color-neutral-100);border-color:var(--color-neutral-200);opacity:0.6;cursor:not-allowed}.fb-dp-icon{color:var(--color-neutral-400);display:inline-flex;flex-shrink:0}.fb-dp-text{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--color-neutral-400)}.fb-dp-trigger.has-value .fb-dp-text{color:var(--color-neutral-black)}.fb-dp-clear{display:inline-flex;align-items:center;padding:2px;background:none;border:none;cursor:pointer;color:var(--color-neutral-400);border-radius:var(--radius-xs);flex-shrink:0;transition:color 0.15s}.fb-dp-clear:hover{color:var(--color-neutral-700)}.fb-cal-popup{position:absolute;top:calc(100% + 8px);left:0;z-index:50;background:var(--color-neutral-white);border:var(--border-standard) solid var(--color-neutral-200);border-radius:var(--radius-md);box-shadow:0 16px 48px rgba(0, 0, 0, 0.12);padding:var(--spacing-16);display:flex;gap:var(--spacing-16);user-select:none}.fb-cal-divider{width:1px;background:var(--color-neutral-100);margin:0 var(--spacing-4);flex-shrink:0}.fb-cal-month{display:flex;flex-direction:column;gap:var(--spacing-4)}.fb-cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--spacing-8)}.fb-cal-title{font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black)}.fb-cal-nav-btn{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:var(--border-standard) solid var(--color-neutral-200);border-radius:var(--radius-xs);background:transparent;cursor:pointer;color:var(--color-neutral-500);transition:background 0.1s, color 0.1s;flex-shrink:0}.fb-cal-nav-btn:hover{background:var(--color-neutral-50);color:var(--color-neutral-black)}.fb-cal-nav-btn:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:1px}.fb-cal-nav-btn--hidden{visibility:hidden;pointer-events:none}.fb-cal-day-headers{display:grid;grid-template-columns:repeat(7, 36px);gap:2px;margin-bottom:4px}.fb-cal-day-header{width:36px;height:28px;display:flex;align-items:center;justify-content:center;font-size:var(--font-size-12);font-weight:var(--font-weight-semibold);color:var(--color-neutral-400)}.fb-cal-grid{display:grid;grid-template-columns:repeat(7, 36px);gap:2px}.fb-cal-cell--empty{width:36px;height:36px}.fb-cal-day{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:var(--font-size-14);font-family:var(--font-family-primary);font-weight:var(--font-weight-regular);border:none;border-radius:var(--radius-xs);background:transparent;color:var(--color-neutral-black);cursor:pointer;position:relative;transition:background 0.1s;outline:none;box-sizing:border-box}.fb-cal-day:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:1px}.fb-cal-day:hover:not(.fb-cal-day--selected){background:var(--color-neutral-100)}.fb-cal-day--outside{color:var(--color-neutral-300)}.fb-cal-day--today{color:var(--color-primary-600);font-weight:var(--font-weight-semibold)}.fb-cal-day--in-range{background:var(--color-primary-50);color:var(--color-neutral-black)}.fb-cal-day--in-range:hover{background:var(--color-primary-100)}.fb-cal-day--selected{background:var(--color-primary-500);color:var(--color-neutral-white);font-weight:var(--font-weight-semibold)}.fb-cal-day--selected:hover{background:var(--color-primary-600)}.fb-cal-today-dot{position:absolute;bottom:3px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:var(--color-primary-500)}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500);margin-top:var(--spacing-4)}.fb-helper--error{color:var(--color-danger-600)}`;

// ── Calendar utilities ──────────────────────────────────────────────────────
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
function pad(n) { return String(n).padStart(2, '0'); }
function dateToISO(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function isoToDate(s) {
    if (!s)
        return null;
    const [y, m, d] = s.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    return isNaN(dt.getTime()) ? null : dt;
}
function formatDisplay(iso) {
    const d = isoToDate(iso);
    return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
}
function todayISO() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return dateToISO(d);
}
function buildGrid(year, month) {
    const cells = [];
    const first = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    for (let i = first - 1; i >= 0; i--)
        cells.push({ iso: dateToISO(new Date(year, month - 1, prevDays - i)), day: prevDays - i, current: false });
    for (let d = 1; d <= daysInMonth; d++)
        cells.push({ iso: dateToISO(new Date(year, month, d)), day: d, current: true });
    let nx = 1;
    while (cells.length < 42)
        cells.push({ iso: dateToISO(new Date(year, month + 1, nx)), day: nx++, current: false });
    return cells;
}
let idCounter = 0;
const FbDatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
        this.fbRangeChange = createEvent(this, "fbRangeChange");
        this.fbClear = createEvent(this, "fbClear");
        /** Visible label above the trigger button */
        this.label = '';
        /** Single date or date range selection */
        this.mode = 'single';
        /** Currently selected date as ISO string (YYYY-MM-DD), single mode */
        this.value = '';
        /** Range start date as ISO string */
        this.valueFrom = '';
        /** Range end date as ISO string */
        this.valueTo = '';
        this.placeholder = 'Pick a date';
        this.state = 'default';
        this.helperText = '';
        this.required = false;
        /**
         * When true, days from the previous/next month are hidden in the grid.
         * (Inverse of showOutsideDays to allow a boolean false-default via attribute.)
         */
        this.hideOutsideDays = false;
        /**
         * Number of month columns shown in range mode (1 or 2).
         * Single mode always shows 1.
         */
        this.calendarColumns = 2;
        this.open = false;
        this.viewYear = 0;
        this.viewMonth = 0;
        this.hoverDate = '';
        this._today = '';
        this.clearValue = (e) => {
            e.stopPropagation();
            this.value = '';
            this.valueFrom = '';
            this.valueTo = '';
            this.fbClear.emit();
        };
        this.prevMonth = () => {
            if (this.viewMonth === 0) {
                this.viewYear--;
                this.viewMonth = 11;
            }
            else
                this.viewMonth--;
        };
        this.nextMonth = () => {
            if (this.viewMonth === 11) {
                this.viewYear++;
                this.viewMonth = 0;
            }
            else
                this.viewMonth++;
        };
    }
    connectedCallback() {
        idCounter++;
        this.triggerId = `fb-dp-t-${idCounter}`;
        this.dialogId = `fb-dp-d-${idCounter}`;
        this.labelId = `fb-dp-l-${idCounter}`;
        this.helperId = `fb-dp-h-${idCounter}`;
        this._today = todayISO();
        this.initView();
    }
    onValueChange() { this.initView(); }
    initView() {
        const seed = this.mode === 'single' ? this.value : (this.valueFrom || '');
        const d = isoToDate(seed) || new Date();
        this.viewYear = d.getFullYear();
        this.viewMonth = d.getMonth();
    }
    onDocumentClick(e) {
        if (this.open && !this.el.contains(e.target))
            this.closeCalendar();
    }
    // ── Helpers ─────────────────────────────────────────────────────────────
    get isDisabled() { return this.state === 'disabled'; }
    get isError() { return this.state === 'error'; }
    get hasValue() { return this.mode === 'single' ? !!this.value : !!this.valueFrom; }
    get displayText() {
        if (this.mode === 'single')
            return this.value ? formatDisplay(this.value) : this.placeholder;
        if (!this.valueFrom)
            return this.placeholder;
        if (!this.valueTo)
            return `${formatDisplay(this.valueFrom)} →`;
        return `${formatDisplay(this.valueFrom)} – ${formatDisplay(this.valueTo)}`;
    }
    // ── Actions ──────────────────────────────────────────────────────────────
    openCalendar() {
        if (!this.isDisabled)
            this.open = true;
    }
    closeCalendar() { this.open = false; this.hoverDate = ''; }
    selectDay(iso) {
        if (this.mode === 'single') {
            this.value = iso;
            this.fbChange.emit(iso);
            this.closeCalendar();
            return;
        }
        // Range: first click starts range, second click ends it
        if (!this.valueFrom || (this.valueFrom && this.valueTo)) {
            this.valueFrom = iso;
            this.valueTo = '';
        }
        else {
            if (iso < this.valueFrom) {
                this.valueTo = this.valueFrom;
                this.valueFrom = iso;
            }
            else {
                this.valueTo = iso;
            }
            this.fbRangeChange.emit({ from: this.valueFrom, to: this.valueTo });
            this.closeCalendar();
        }
    }
    isSelected(iso) {
        return this.mode === 'single'
            ? iso === this.value
            : iso === this.valueFrom || iso === this.valueTo;
    }
    isInRange(iso) {
        if (this.mode !== 'range' || !this.valueFrom)
            return false;
        const end = this.valueTo || this.hoverDate;
        if (!end)
            return false;
        const from = this.valueFrom <= end ? this.valueFrom : end;
        const to = this.valueFrom <= end ? end : this.valueFrom;
        return iso > from && iso < to;
    }
    // ── Month renderer ───────────────────────────────────────────────────────
    renderMonth(year, month, showPrev, showNext) {
        const cells = buildGrid(year, month);
        return (h("div", { class: "fb-cal-month" }, h("div", { class: "fb-cal-nav" }, h("button", { type: "button", class: { 'fb-cal-nav-btn': true, 'fb-cal-nav-btn--hidden': !showPrev }, "aria-label": "Previous month", tabIndex: showPrev ? 0 : -1, onClick: showPrev ? this.prevMonth : undefined }, h("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M10 3L5 8l5 5" }))), h("span", { class: "fb-cal-title" }, MONTHS[month], " ", year), h("button", { type: "button", class: { 'fb-cal-nav-btn': true, 'fb-cal-nav-btn--hidden': !showNext }, "aria-label": "Next month", tabIndex: showNext ? 0 : -1, onClick: showNext ? this.nextMonth : undefined }, h("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M6 3l5 5-5 5" })))), h("div", { class: "fb-cal-day-headers", "aria-hidden": "true" }, DAYS_SHORT.map(d => h("div", { class: "fb-cal-day-header" }, d))), h("div", { class: "fb-cal-grid" }, cells.map(cell => {
            if (this.hideOutsideDays && !cell.current)
                return h("div", { class: "fb-cal-cell--empty" });
            const sel = this.isSelected(cell.iso);
            const inRange = this.isInRange(cell.iso);
            const isToday = cell.iso === this._today;
            const d = isoToDate(cell.iso);
            const ariaLbl = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
            return (h("button", { key: cell.iso, type: "button", class: {
                    'fb-cal-day': true,
                    'fb-cal-day--outside': !cell.current,
                    'fb-cal-day--today': isToday && !sel,
                    'fb-cal-day--selected': sel,
                    'fb-cal-day--in-range': inRange && !sel,
                }, "aria-label": ariaLbl, "aria-selected": sel ? 'true' : 'false', onClick: () => this.selectDay(cell.iso), onMouseEnter: () => {
                    if (this.mode === 'range' && this.valueFrom && !this.valueTo)
                        this.hoverDate = cell.iso;
                }, onMouseLeave: () => { this.hoverDate = ''; } }, cell.day, isToday && !sel && h("span", { class: "fb-cal-today-dot", "aria-hidden": "true" })));
        }))));
    }
    // ── Render ───────────────────────────────────────────────────────────────
    render() {
        const m2Year = this.viewMonth === 11 ? this.viewYear + 1 : this.viewYear;
        const m2Month = this.viewMonth === 11 ? 0 : this.viewMonth + 1;
        const showDual = this.mode === 'range' && this.calendarColumns >= 2;
        const hasHelper = !!this.helperText;
        return (h(Host, { key: '0aa30e9503ff0f9ef34853362748720781a8b086' }, h("div", { key: 'de2e32427931b47832bcea15034a8604e61bfc01', class: "fb-dp-wrapper" }, this.label && (h("label", { key: '033c21182abeddd3238425927b0c20b88dd5c523', id: this.labelId, htmlFor: this.triggerId, class: "fb-label" }, this.label, this.required && h("span", { key: '965bab130c9e9b48e8bb54c36bbf4c8cd025ef68', class: "required-indicator", "aria-hidden": "true" }, " *"))), h("div", { key: '21bfe6277a4b4a8d385934de7d20c662a408d8a5', class: "fb-dp-container" }, h("button", { key: '80e3a06f247149de4ae6522bcb74a60c8ca16831', id: this.triggerId, type: "button", class: {
                'fb-dp-trigger': true,
                'is-open': this.open,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'has-value': this.hasValue,
                'is-range': this.mode === 'range',
            }, "aria-haspopup": "dialog", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.dialogId, "aria-labelledby": this.label ? `${this.labelId} ${this.triggerId}` : null, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, disabled: this.isDisabled, onClick: () => this.open ? this.closeCalendar() : this.openCalendar(), onKeyDown: e => {
                if ((e.key === 'Enter' || e.key === ' ') && !this.open) {
                    e.preventDefault();
                    this.openCalendar();
                }
                if (e.key === 'Escape' && this.open) {
                    e.preventDefault();
                    this.closeCalendar();
                }
            } }, h("span", { key: '271810451dc2f69fee382be573dc6ec6bfdbba6e', class: "fb-dp-icon", "aria-hidden": "true" }, h("svg", { key: 'd94607d52f819ce0a13692d71826b3aed6473a25', width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", "stroke-width": "1.5" }, h("rect", { key: 'bf0478e4b4dec72804f14292ccf24460014ddf93', x: "2", y: "3", width: "12", height: "11", rx: "2" }), h("path", { key: 'ffe85a615efb7345846c24074d6a6513ebaeeae3', d: "M2 7h12" }), h("path", { key: '2d52c5fe82973701db54e1a1984f223fb97a83e9', d: "M5 2v2M11 2v2", "stroke-linecap": "round" }))), h("span", { key: '3f0b9a6a73171e377cf6a59680cf28f394c8cc7e', class: "fb-dp-text" }, this.displayText), this.hasValue && !this.isDisabled && (h("button", { key: '8cc5ed30ef7d2c31bc35b758ec3d08cd8b400ab3', type: "button", class: "fb-dp-clear", "aria-label": "Clear date", tabIndex: -1, onMouseDown: e => e.preventDefault(), onClick: this.clearValue }, h("svg", { key: '6e742be158b6edf3d7cb5eb2111cf18c0b4dc2a3', width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }, h("path", { key: '6dab4aa673ba32da6231d6a40482ca8a7516dddb', d: "M3 3l10 10M13 3L3 13" }))))), this.open && (h("div", { key: '68e2e0c382e59e8e8daa6e8a5b6f9c72ee63283b', id: this.dialogId, role: "dialog", "aria-modal": "true", "aria-label": "Date picker calendar", class: { 'fb-cal-popup': true, 'fb-cal-popup--dual': showDual }, onKeyDown: e => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.closeCalendar();
                }
            } }, showDual ? ([
            this.renderMonth(this.viewYear, this.viewMonth, true, false),
            h("div", { class: "fb-cal-divider", "aria-hidden": "true" }),
            this.renderMonth(m2Year, m2Month, false, true),
        ]) : (this.renderMonth(this.viewYear, this.viewMonth, true, true))))), hasHelper && (h("div", { key: '82ae06e1e99935e90d3781fa18bb4244e638fb5e', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.helperText)))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": [{
                "onValueChange": 0
            }],
        "valueFrom": [{
                "onValueChange": 0
            }]
    }; }
};
FbDatePicker.style = fbDatePickerCss();

export { FbDatePicker as fb_date_picker };
