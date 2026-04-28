import { EventEmitter } from '../../stencil-public-runtime';
export declare class FbDatePicker {
    el: HTMLElement;
    /** Visible label above the trigger button */
    label: string;
    /** Single date or date range selection */
    mode: 'single' | 'range';
    /** Currently selected date as ISO string (YYYY-MM-DD), single mode */
    value: string;
    /** Range start date as ISO string */
    valueFrom: string;
    /** Range end date as ISO string */
    valueTo: string;
    placeholder: string;
    state: 'default' | 'error' | 'disabled';
    helperText: string;
    required: boolean;
    /**
     * When true, days from the previous/next month are hidden in the grid.
     * (Inverse of showOutsideDays to allow a boolean false-default via attribute.)
     */
    hideOutsideDays: boolean;
    /**
     * Number of month columns shown in range mode (1 or 2).
     * Single mode always shows 1.
     */
    calendarColumns: number;
    /** Fires when a date is selected (single mode): detail = ISO string */
    fbChange: EventEmitter<string>;
    /** Fires when a range is complete (range mode): detail = { from, to } */
    fbRangeChange: EventEmitter<{
        from: string;
        to: string;
    }>;
    /** Fires when the selection is cleared */
    fbClear: EventEmitter<void>;
    open: boolean;
    viewYear: number;
    viewMonth: number;
    hoverDate: string;
    private triggerId;
    private dialogId;
    private labelId;
    private helperId;
    private _today;
    connectedCallback(): void;
    onValueChange(): void;
    private initView;
    onDocumentClick(e: MouseEvent): void;
    private get isDisabled();
    private get isError();
    private get hasValue();
    private get displayText();
    private openCalendar;
    private closeCalendar;
    private selectDay;
    private clearValue;
    private prevMonth;
    private nextMonth;
    private isSelected;
    private isInRange;
    private renderMonth;
    render(): any;
}
