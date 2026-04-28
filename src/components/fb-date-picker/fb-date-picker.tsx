import { Component, Prop, State, Event, EventEmitter, Element, Listen, Watch, h, Host } from '@stencil/core';

// ── Calendar utilities ──────────────────────────────────────────────────────

const MONTHS     = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_SHORT = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function pad(n: number) { return String(n).padStart(2, '0'); }
function dateToISO(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function isoToDate(s: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return isNaN(dt.getTime()) ? null : dt;
}
function formatDisplay(iso: string): string {
  const d = isoToDate(iso);
  return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
}
function todayISO() {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  return dateToISO(d);
}
function buildGrid(year: number, month: number) {
  const cells: { iso: string; day: number; current: boolean }[] = [];
  const first       = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays    = new Date(year, month, 0).getDate();
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

@Component({
  tag: 'fb-date-picker',
  styleUrl: 'fb-date-picker.css',
  shadow: true,
})
export class FbDatePicker {
  @Element() el!: HTMLElement;

  /** Visible label above the trigger button */
  @Prop() label: string = '';
  /** Single date or date range selection */
  @Prop() mode: 'single' | 'range' = 'single';
  /** Currently selected date as ISO string (YYYY-MM-DD), single mode */
  @Prop({ mutable: true }) value: string = '';
  /** Range start date as ISO string */
  @Prop({ mutable: true }) valueFrom: string = '';
  /** Range end date as ISO string */
  @Prop({ mutable: true }) valueTo: string = '';
  @Prop() placeholder: string = 'Pick a date';
  @Prop() state: 'default' | 'error' | 'disabled' = 'default';
  @Prop() helperText: string = '';
  @Prop() required: boolean = false;
  /**
   * When true, days from the previous/next month are hidden in the grid.
   * (Inverse of showOutsideDays to allow a boolean false-default via attribute.)
   */
  @Prop() hideOutsideDays: boolean = false;
  /**
   * Number of month columns shown in range mode (1 or 2).
   * Single mode always shows 1.
   */
  @Prop() calendarColumns: number = 2;

  /** Fires when a date is selected (single mode): detail = ISO string */
  @Event() fbChange: EventEmitter<string>;
  /** Fires when a range is complete (range mode): detail = { from, to } */
  @Event() fbRangeChange: EventEmitter<{ from: string; to: string }>;
  /** Fires when the selection is cleared */
  @Event() fbClear: EventEmitter<void>;

  @State() open: boolean = false;
  @State() viewYear: number = 0;
  @State() viewMonth: number = 0;
  @State() hoverDate: string = '';

  private triggerId!: string;
  private dialogId!: string;
  private labelId!: string;
  private helperId!: string;
  private _today: string = '';

  connectedCallback() {
    idCounter++;
    this.triggerId = `fb-dp-t-${idCounter}`;
    this.dialogId  = `fb-dp-d-${idCounter}`;
    this.labelId   = `fb-dp-l-${idCounter}`;
    this.helperId  = `fb-dp-h-${idCounter}`;
    this._today    = todayISO();
    this.initView();
  }

  @Watch('value')
  @Watch('valueFrom')
  onValueChange() { this.initView(); }

  private initView() {
    const seed = this.mode === 'single' ? this.value : (this.valueFrom || '');
    const d    = isoToDate(seed) || new Date();
    this.viewYear  = d.getFullYear();
    this.viewMonth = d.getMonth();
  }

  @Listen('click', { target: 'document' })
  onDocumentClick(e: MouseEvent) {
    if (this.open && !this.el.contains(e.target as Node)) this.closeCalendar();
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  private get isDisabled() { return this.state === 'disabled'; }
  private get isError()    { return this.state === 'error'; }
  private get hasValue()   { return this.mode === 'single' ? !!this.value : !!this.valueFrom; }

  private get displayText() {
    if (this.mode === 'single') return this.value ? formatDisplay(this.value) : this.placeholder;
    if (!this.valueFrom) return this.placeholder;
    if (!this.valueTo)   return `${formatDisplay(this.valueFrom)} →`;
    return `${formatDisplay(this.valueFrom)} – ${formatDisplay(this.valueTo)}`;
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  private openCalendar()  { if (!this.isDisabled) this.open = true; }
  private closeCalendar() { this.open = false; this.hoverDate = ''; }

  private selectDay(iso: string) {
    if (this.mode === 'single') {
      this.value = iso;
      this.fbChange.emit(iso);
      this.closeCalendar();
      return;
    }
    // Range: first click starts range, second click ends it
    if (!this.valueFrom || (this.valueFrom && this.valueTo)) {
      this.valueFrom = iso;
      this.valueTo   = '';
    } else {
      if (iso < this.valueFrom) {
        this.valueTo   = this.valueFrom;
        this.valueFrom = iso;
      } else {
        this.valueTo = iso;
      }
      this.fbRangeChange.emit({ from: this.valueFrom, to: this.valueTo });
      this.closeCalendar();
    }
  }

  private clearValue = (e: MouseEvent) => {
    e.stopPropagation();
    this.value     = '';
    this.valueFrom = '';
    this.valueTo   = '';
    this.fbClear.emit();
  };

  private prevMonth = () => {
    if (this.viewMonth === 0) { this.viewYear--; this.viewMonth = 11; }
    else this.viewMonth--;
  };

  private nextMonth = () => {
    if (this.viewMonth === 11) { this.viewYear++; this.viewMonth = 0; }
    else this.viewMonth++;
  };

  private isSelected(iso: string) {
    return this.mode === 'single'
      ? iso === this.value
      : iso === this.valueFrom || iso === this.valueTo;
  }

  private isInRange(iso: string) {
    if (this.mode !== 'range' || !this.valueFrom) return false;
    const end  = this.valueTo || this.hoverDate;
    if (!end) return false;
    const from = this.valueFrom <= end ? this.valueFrom : end;
    const to   = this.valueFrom <= end ? end : this.valueFrom;
    return iso > from && iso < to;
  }

  // ── Month renderer ───────────────────────────────────────────────────────

  private renderMonth(year: number, month: number, showPrev: boolean, showNext: boolean) {
    const cells = buildGrid(year, month);
    return (
      <div class="fb-cal-month">
        {/* Navigation */}
        <div class="fb-cal-nav">
          <button
            type="button"
            class={{ 'fb-cal-nav-btn': true, 'fb-cal-nav-btn--hidden': !showPrev }}
            aria-label="Previous month"
            tabIndex={showPrev ? 0 : -1}
            onClick={showPrev ? this.prevMonth : undefined}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 3L5 8l5 5"/>
            </svg>
          </button>
          <span class="fb-cal-title">{MONTHS[month]} {year}</span>
          <button
            type="button"
            class={{ 'fb-cal-nav-btn': true, 'fb-cal-nav-btn--hidden': !showNext }}
            aria-label="Next month"
            tabIndex={showNext ? 0 : -1}
            onClick={showNext ? this.nextMonth : undefined}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 3l5 5-5 5"/>
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div class="fb-cal-day-headers" aria-hidden="true">
          {DAYS_SHORT.map(d => <div class="fb-cal-day-header">{d}</div>)}
        </div>

        {/* Day grid — aria-label on each button gives full date for screen readers */}
        <div class="fb-cal-grid">
          {cells.map(cell => {
            if (this.hideOutsideDays && !cell.current)
              return <div class="fb-cal-cell--empty" />;

            const sel     = this.isSelected(cell.iso);
            const inRange = this.isInRange(cell.iso);
            const isToday = cell.iso === this._today;
            const d       = isoToDate(cell.iso)!;
            const ariaLbl = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

            return (
              <button
                key={cell.iso}
                type="button"
                class={{
                  'fb-cal-day': true,
                  'fb-cal-day--outside':  !cell.current,
                  'fb-cal-day--today':    isToday && !sel,
                  'fb-cal-day--selected': sel,
                  'fb-cal-day--in-range': inRange && !sel,
                }}
                aria-label={ariaLbl}
                aria-selected={sel ? 'true' : 'false'}
                onClick={() => this.selectDay(cell.iso)}
                onMouseEnter={() => {
                  if (this.mode === 'range' && this.valueFrom && !this.valueTo)
                    this.hoverDate = cell.iso;
                }}
                onMouseLeave={() => { this.hoverDate = ''; }}
              >
                {cell.day}
                {isToday && !sel && <span class="fb-cal-today-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────

  render() {
    const m2Year  = this.viewMonth === 11 ? this.viewYear + 1 : this.viewYear;
    const m2Month = this.viewMonth === 11 ? 0 : this.viewMonth + 1;
    const showDual = this.mode === 'range' && this.calendarColumns >= 2;
    const hasHelper = !!this.helperText;

    return (
      <Host>
        <div class="fb-dp-wrapper">

          {this.label && (
            <label id={this.labelId} htmlFor={this.triggerId} class="fb-label">
              {this.label}
              {this.required && <span class="required-indicator" aria-hidden="true"> *</span>}
            </label>
          )}

          <div class="fb-dp-container">
            {/*
              Trigger button.
              aria-haspopup="dialog" tells AT a dialog will appear.
              aria-expanded reflects open state.
            */}
            <button
              id={this.triggerId}
              type="button"
              class={{
                'fb-dp-trigger': true,
                'is-open':        this.open,
                'state-error':    this.isError,
                'state-disabled': this.isDisabled,
                'has-value':      this.hasValue,
                'is-range':       this.mode === 'range',
              }}
              aria-haspopup="dialog"
              aria-expanded={this.open ? 'true' : 'false'}
              aria-controls={this.dialogId}
              aria-labelledby={this.label ? `${this.labelId} ${this.triggerId}` : null}
              aria-required={this.required ? 'true' : null}
              aria-invalid={this.isError ? 'true' : null}
              aria-describedby={hasHelper ? this.helperId : null}
              disabled={this.isDisabled}
              onClick={() => this.open ? this.closeCalendar() : this.openCalendar()}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ' ') && !this.open) { e.preventDefault(); this.openCalendar(); }
                if (e.key === 'Escape' && this.open) { e.preventDefault(); this.closeCalendar(); }
              }}
            >
              <span class="fb-dp-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="2" y="3" width="12" height="11" rx="2"/>
                  <path d="M2 7h12"/>
                  <path d="M5 2v2M11 2v2" stroke-linecap="round"/>
                </svg>
              </span>
              <span class="fb-dp-text">{this.displayText}</span>
              {this.hasValue && !this.isDisabled && (
                <button
                  type="button"
                  class="fb-dp-clear"
                  aria-label="Clear date"
                  tabIndex={-1}
                  onMouseDown={e => e.preventDefault()}
                  onClick={this.clearValue}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                       stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <path d="M3 3l10 10M13 3L3 13"/>
                  </svg>
                </button>
              )}
            </button>

            {this.open && (
              <div
                id={this.dialogId}
                role="dialog"
                aria-modal="true"
                aria-label="Date picker calendar"
                class={{ 'fb-cal-popup': true, 'fb-cal-popup--dual': showDual }}
                onKeyDown={e => { if (e.key === 'Escape') { e.preventDefault(); this.closeCalendar(); } }}
              >
                {showDual ? (
                  [
                    this.renderMonth(this.viewYear, this.viewMonth, true, false),
                    <div class="fb-cal-divider" aria-hidden="true" />,
                    this.renderMonth(m2Year, m2Month, false, true),
                  ]
                ) : (
                  this.renderMonth(this.viewYear, this.viewMonth, true, true)
                )}
              </div>
            )}
          </div>

          {hasHelper && (
            <div
              id={this.helperId}
              class={{ 'fb-helper': true, 'fb-helper--error': this.isError }}
              role={this.isError ? 'alert' : null}
            >
              {this.helperText}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
