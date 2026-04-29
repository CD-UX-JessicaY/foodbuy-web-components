import { h, Host } from "@stencil/core";
import { renderFieldLabel, renderHelperText } from "../../utils/field-helpers";
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
export class FbDatePicker {
    constructor() {
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
        return (h(Host, { key: '31f7beef95d3766109da3fa7a3514757c8c271d6' }, h("div", { key: '9c307bdd77380e9f4259a3e2d5ac5bc489408e71', class: "fb-dp-wrapper" }, renderFieldLabel(this.label, this.required, this.triggerId, this.labelId), h("div", { key: 'b96517888e887a51276c7d9e101daa6d1c3877a3', class: "fb-dp-container" }, h("div", { key: '798a5060df3cc7de4dc24145e6e9bcaf8058ba02', class: "fb-dp-field" }, h("button", { key: 'e2a4ed3146dfc4d97e90df28cc7eb1bcf969d68d', id: this.triggerId, type: "button", class: {
                'fb-dp-trigger': true,
                'is-open': this.open,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'has-value': this.hasValue,
                'has-clear': this.hasValue && !this.isDisabled,
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
            } }, h("span", { key: '1e063015cc7030cc2d97c082abf9133437f03741', class: "fb-dp-icon", "aria-hidden": "true" }, h("svg", { key: 'c6a2fb2b3396201cd24bf88e13afe97bec322334', width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", "stroke-width": "1.5" }, h("rect", { key: '9abe54e1c1900c0d0e4fb84ab766f3d71f355821', x: "2", y: "3", width: "12", height: "11", rx: "2" }), h("path", { key: '09d46cc319bc95652def28a2342b7a65f642f1de', d: "M2 7h12" }), h("path", { key: 'c1ab6b78f19d7b9e6b1b7e9fd85b0b3c7c242f9c', d: "M5 2v2M11 2v2", "stroke-linecap": "round" }))), h("span", { key: '282e2a3f7313c255ffaa86404a6e3eff92d08347', class: "fb-dp-text" }, this.displayText)), this.hasValue && !this.isDisabled && (h("button", { key: '6f3a3e2bca6204a1a36b5fb6e9ed6821a0a05ba2', type: "button", class: "fb-dp-clear", "aria-label": "Clear date", onMouseDown: e => e.preventDefault(), onClick: this.clearValue }, h("svg", { key: '10ddbc376d25c7c9a9a484ec5db0bc03f7a9c180', width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }, h("path", { key: '3c68d9b3540df86db0804908a574e3fdb55765b0', d: "M3 3l10 10M13 3L3 13" }))))), this.open && (h("div", { key: 'd05cd9cad2e7249e3ad89e7ad414e54e68c1ebee', id: this.dialogId, role: "dialog", "aria-modal": "true", "aria-label": "Date picker calendar", class: { 'fb-cal-popup': true, 'fb-cal-popup--dual': showDual }, onKeyDown: e => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.closeCalendar();
                }
            } }, showDual ? ([
            this.renderMonth(this.viewYear, this.viewMonth, true, false),
            h("div", { class: "fb-cal-divider", "aria-hidden": "true" }),
            this.renderMonth(m2Year, m2Month, false, true),
        ]) : (this.renderMonth(this.viewYear, this.viewMonth, true, true))))), renderHelperText(this.helperText, this.helperId, this.isError))));
    }
    static get is() { return "fb-date-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-date-picker.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-date-picker.css"]
        };
    }
    static get properties() {
        return {
            "label": {
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
                    "text": "Visible label above the trigger button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "''"
            },
            "mode": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'single' | 'range'",
                    "resolved": "\"range\" | \"single\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Single date or date range selection"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "mode",
                "defaultValue": "'single'"
            },
            "value": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Currently selected date as ISO string (YYYY-MM-DD), single mode"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value",
                "defaultValue": "''"
            },
            "valueFrom": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Range start date as ISO string"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value-from",
                "defaultValue": "''"
            },
            "valueTo": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Range end date as ISO string"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value-to",
                "defaultValue": "''"
            },
            "placeholder": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "placeholder",
                "defaultValue": "'Pick a date'"
            },
            "state": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'default' | 'error' | 'disabled'",
                    "resolved": "\"default\" | \"disabled\" | \"error\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "state",
                "defaultValue": "'default'"
            },
            "helperText": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "helper-text",
                "defaultValue": "''"
            },
            "required": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "required",
                "defaultValue": "false"
            },
            "hideOutsideDays": {
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
                    "text": "When true, days from the previous/next month are hidden in the grid.\n(Inverse of showOutsideDays to allow a boolean false-default via attribute.)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "hide-outside-days",
                "defaultValue": "false"
            },
            "calendarColumns": {
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
                    "text": "Number of month columns shown in range mode (1 or 2).\nSingle mode always shows 1."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "calendar-columns",
                "defaultValue": "2"
            }
        };
    }
    static get states() {
        return {
            "open": {},
            "viewYear": {},
            "viewMonth": {},
            "hoverDate": {}
        };
    }
    static get events() {
        return [{
                "method": "fbChange",
                "name": "fbChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when a date is selected (single mode): detail = ISO string"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "fbRangeChange",
                "name": "fbRangeChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when a range is complete (range mode): detail = { from, to }"
                },
                "complexType": {
                    "original": "{ from: string; to: string }",
                    "resolved": "{ from: string; to: string; }",
                    "references": {}
                }
            }, {
                "method": "fbClear",
                "name": "fbClear",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when the selection is cleared"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "onValueChange"
            }, {
                "propName": "valueFrom",
                "methodName": "onValueChange"
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
