import { Component, Prop, State, Event, EventEmitter, Element, Listen, h, Host } from '@stencil/core';
import { renderFieldLabel, renderHelperText } from '../../utils/field-helpers';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectState = 'default' | 'error' | 'disabled';
export type SelectSize  = 'sm' | 'default' | 'lg';

let idCounter = 0;

@Component({
  tag: 'fb-select',
  styleUrl: 'fb-select.css',
  shadow: true,
})
export class FbSelect {
  @Element() el!: HTMLElement;

  @Prop() label: string = '';
  @Prop() options: SelectOption[] | string = '[]';
  @Prop({ mutable: true }) value: string = '';
  @Prop() placeholder: string = 'Select an option';
  @Prop() state: SelectState = 'default';
  @Prop() size: SelectSize = 'default';
  @Prop() helperText: string = '';
  @Prop() required: boolean = false;

  @State() open: boolean = false;
  @State() focusedIndex: number = -1;

  @Event() fbChange: EventEmitter<string>;

  private triggerId: string;
  private listboxId: string;
  private helperId: string;
  private labelId: string;

  connectedCallback() {
    idCounter++;
    this.triggerId = `fb-select-trigger-${idCounter}`;
    this.listboxId = `fb-select-listbox-${idCounter}`;
    this.helperId  = `fb-select-helper-${idCounter}`;
    this.labelId   = `fb-select-label-${idCounter}`;
  }

  // Close on outside click
  @Listen('click', { target: 'document' })
  onDocumentClick(e: MouseEvent) {
    if (this.open && !this.el.contains(e.target as Node)) {
      this.close();
    }
  }

  private get parsedOptions(): SelectOption[] {
    if (typeof this.options === 'string') {
      try { return JSON.parse(this.options); } catch { return []; }
    }
    return this.options;
  }

  private get isDisabled() { return this.state === 'disabled'; }
  private get isError()    { return this.state === 'error'; }
  private get selectedOption() { return this.parsedOptions.find(o => o.value === this.value); }

  private open_() {
    if (this.isDisabled) return;
    this.open = true;
    // Focus the currently selected option, or the first one
    const opts = this.parsedOptions.filter(o => !o.disabled);
    const selIdx = opts.findIndex(o => o.value === this.value);
    this.focusedIndex = selIdx >= 0 ? selIdx : 0;
  }

  private close() {
    this.open = false;
    this.focusedIndex = -1;
    // Return focus to trigger
    this.el.shadowRoot?.querySelector<HTMLButtonElement>(`#${this.triggerId}`)?.focus();
  }

  private selectOption(opt: SelectOption) {
    if (opt.disabled) return;
    this.value = opt.value;
    this.fbChange.emit(opt.value);
    this.close();
  }

  private handleTriggerKeyDown = (e: KeyboardEvent) => {
    const opts = this.parsedOptions.filter(o => !o.disabled);
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) { this.open_(); }
        else if (this.focusedIndex < opts.length - 1) { this.focusedIndex++; }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.open && this.focusedIndex > 0) { this.focusedIndex--; }
        break;
      case 'Home':
        e.preventDefault();
        if (this.open) { this.focusedIndex = 0; }
        break;
      case 'End':
        e.preventDefault();
        if (this.open) { this.focusedIndex = opts.length - 1; }
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
      case 'Tab':
        if (this.open) { this.close(); }
        break;
      default:
        // Type-ahead: jump to first option starting with pressed character
        if (e.key.length === 1) {
          const char = e.key.toLowerCase();
          const idx  = opts.findIndex((o, i) => i > this.focusedIndex && o.label.toLowerCase().startsWith(char));
          const fallback = opts.findIndex(o => o.label.toLowerCase().startsWith(char));
          const target = idx >= 0 ? idx : fallback;
          if (target >= 0) { this.focusedIndex = target; if (!this.open) this.open_(); }
        }
    }
  };

  private handleOptionKeyDown = (e: KeyboardEvent, opt: SelectOption) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.selectOption(opt);
    }
  };

  render() {
    const opts      = this.parsedOptions;
    const enabledOpts = opts.filter(o => !o.disabled);
    const hasHelper = !!this.helperText;
    const activeId  = this.open && this.focusedIndex >= 0
      ? `${this.listboxId}-opt-${enabledOpts[this.focusedIndex]?.value}`
      : undefined;

    return (
      <Host>
        <div class="fb-select-wrapper" style={{ fontFamily: 'var(--font-family-primary)' }}>

          {renderFieldLabel(this.label, this.required, this.triggerId, this.labelId)}

          <div class="fb-select-container" style={{ position: 'relative' }}>
            {/*
              Trigger button.
              aria-haspopup="listbox" tells screen readers a listbox will appear.
              aria-expanded reflects open state.
              aria-labelledby links to both the label and the trigger (so the
              currently selected value is also announced).
              aria-activedescendant points to the focused option in the listbox.
            */}
            <button
              id={this.triggerId}
              type="button"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={this.open ? 'true' : 'false'}
              aria-controls={this.listboxId}
              aria-labelledby={this.label ? `${this.labelId} ${this.triggerId}` : null}
              aria-activedescendant={activeId}
              aria-required={this.required ? 'true' : null}
              aria-invalid={this.isError ? 'true' : null}
              aria-describedby={hasHelper ? this.helperId : null}
              disabled={this.isDisabled}
              class={{
                'fb-select-trigger': true,
                [`size-${this.size}`]: true,
                'open': this.open,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'has-value': !!this.selectedOption,
              }}
              onClick={() => this.open ? this.close() : this.open_()}
              onKeyDown={this.handleTriggerKeyDown}
            >
              <span class="trigger-text">
                {this.selectedOption ? this.selectedOption.label : this.placeholder}
              </span>
              <span aria-hidden="true" class={{ 'chevron': true, 'chevron--open': this.open }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </span>
            </button>

            {/* Dropdown listbox */}
            {this.open && (
              <ul
                id={this.listboxId}
                role="listbox"
                aria-label={this.label || 'Options'}
                class="fb-listbox"
              >
                {opts.map((opt) => {
                  const isSelected = this.value === opt.value;
                  const isFocused  = enabledOpts[this.focusedIndex]?.value === opt.value;
                  const optionId   = `${this.listboxId}-opt-${opt.value}`;

                  return (
                    <li
                      key={opt.value}
                      id={optionId}
                      role="option"
                      aria-selected={isSelected ? 'true' : 'false'}
                      aria-disabled={opt.disabled ? 'true' : null}
                      class={{
                        'fb-option': true,
                        'selected': isSelected,
                        'focused': isFocused,
                        'disabled': !!opt.disabled,
                      }}
                      onClick={() => this.selectOption(opt)}
                      onKeyDown={(e) => this.handleOptionKeyDown(e, opt)}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {renderHelperText(this.helperText, this.helperId, this.isError)}
        </div>
      </Host>
    );
  }
}
