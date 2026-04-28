import { Component, Prop, State, Event, EventEmitter, Element, Watch, Listen, h, Host } from '@stencil/core';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type ComboboxState = 'default' | 'error' | 'disabled';
export type ComboboxSize  = 'sm' | 'default' | 'lg';

let idCounter = 0;

@Component({
  tag: 'fb-combobox',
  styleUrl: 'fb-combobox.css',
  shadow: true,
})
export class FbCombobox {
  @Element() el!: HTMLElement;

  /** Field label */
  @Prop() label: string = '';
  /** JSON array of { value, label, disabled? } */
  @Prop() options: ComboboxOption[] | string = '[]';
  /** Currently selected value */
  @Prop({ mutable: true, reflect: true }) value: string = '';
  @Prop() placeholder: string = 'Search or select…';
  @Prop() state: ComboboxState = 'default';
  @Prop() size: ComboboxSize = 'default';
  @Prop() helperText: string = '';
  @Prop() required: boolean = false;
  /** Show ✕ clear button when a value is set */
  @Prop() clearable: boolean = false;
  /**
   * When true the user may type a value not in the options list.
   * fbChange fires with the raw typed string on blur/Enter.
   */
  @Prop() freeform: boolean = false;
  /** Message shown when no options match the filter */
  @Prop() noResultsText: string = 'No results';

  @State() open: boolean = false;
  @State() inputValue: string = '';
  @State() focusedIndex: number = -1;

  /** Fires when the user selects an option (or commits a freeform value) */
  @Event() fbChange: EventEmitter<string>;
  /** Fires on every keystroke */
  @Event() fbInput: EventEmitter<string>;
  /** Fires when the field is cleared */
  @Event() fbClear: EventEmitter<void>;

  private inputId: string;
  private listboxId: string;
  private helperId: string;
  private labelId: string;
  private inputEl!: HTMLInputElement;

  connectedCallback() {
    idCounter++;
    this.inputId  = `fb-combobox-input-${idCounter}`;
    this.listboxId = `fb-combobox-lb-${idCounter}`;
    this.helperId  = `fb-combobox-helper-${idCounter}`;
    this.labelId   = `fb-combobox-label-${idCounter}`;
    // Initialise display text from value
    const opt = this.parsedOptions.find(o => o.value === this.value);
    this.inputValue = opt ? opt.label : (this.freeform ? this.value : '');
  }

  @Watch('value')
  onValueChange(newVal: string) {
    const opt = this.parsedOptions.find(o => o.value === newVal);
    this.inputValue = opt ? opt.label : (this.freeform ? newVal : '');
  }

  // Close on outside click
  @Listen('click', { target: 'document' })
  onDocumentClick(e: MouseEvent) {
    if (this.open && !this.el.contains(e.target as Node)) {
      this.commitOrReset();
      this.closeDropdown();
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────

  private get parsedOptions(): ComboboxOption[] {
    if (typeof this.options === 'string') {
      try { return JSON.parse(this.options); } catch { return []; }
    }
    return this.options as ComboboxOption[];
  }

  private get filteredOptions(): ComboboxOption[] {
    const q = this.inputValue.toLowerCase().trim();
    if (!q) return this.parsedOptions;
    return this.parsedOptions.filter(o => o.label.toLowerCase().includes(q));
  }

  private get isDisabled() { return this.state === 'disabled'; }
  private get isError()    { return this.state === 'error'; }
  private get hasValue()   { return !!this.value || (this.freeform && !!this.inputValue); }

  // ── Dropdown control ─────────────────────────────────────────────────

  private openDropdown() {
    if (this.isDisabled) return;
    this.open = true;
    this.focusedIndex = -1;
  }

  private closeDropdown() {
    this.open = false;
    this.focusedIndex = -1;
  }

  private commitOrReset() {
    if (this.freeform) {
      if (this.inputValue !== this.value) {
        this.value = this.inputValue;
        this.fbChange.emit(this.inputValue);
      }
    } else {
      // Reset display text to current committed value
      const opt = this.parsedOptions.find(o => o.value === this.value);
      this.inputValue = opt ? opt.label : '';
    }
  }

  private selectOption(opt: ComboboxOption) {
    if (opt.disabled) return;
    this.value      = opt.value;
    this.inputValue = opt.label;
    this.fbChange.emit(opt.value);
    this.closeDropdown();
    this.inputEl?.focus();
  }

  // ── Event handlers ────────────────────────────────────────────────────

  private handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    this.inputValue   = val;
    this.open         = true;
    this.focusedIndex = -1;
    this.fbInput.emit(val);
  };

  private handleFocus = () => {
    if (!this.isDisabled) this.openDropdown();
  };

  private handleBlur = () => {
    // Delay so option onClick fires before blur closes the list
    setTimeout(() => {
      if (!this.open) return;
      this.commitOrReset();
      this.closeDropdown();
    }, 150);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const opts = this.filteredOptions.filter(o => !o.disabled);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) { this.openDropdown(); return; }
        this.focusedIndex = Math.min(this.focusedIndex + 1, opts.length - 1);
        this.scrollOptionIntoView();
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (this.focusedIndex > 0) {
          this.focusedIndex--;
          this.scrollOptionIntoView();
        }
        break;

      case 'Enter':
        if (this.open && this.focusedIndex >= 0 && opts[this.focusedIndex]) {
          e.preventDefault();
          this.selectOption(opts[this.focusedIndex]);
        } else if (this.freeform && this.inputValue) {
          e.preventDefault();
          this.commitOrReset();
          this.closeDropdown();
        }
        break;

      case 'Escape':
        e.preventDefault();
        // Restore display text to committed value without firing change
        const opt = this.parsedOptions.find(o => o.value === this.value);
        this.inputValue = opt ? opt.label : '';
        this.closeDropdown();
        break;

      case 'Tab':
        if (this.open) {
          this.commitOrReset();
          this.closeDropdown();
        }
        break;
    }
  };

  private handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    this.value      = '';
    this.inputValue = '';
    this.fbChange.emit('');
    this.fbClear.emit();
    this.inputEl?.focus();
  };

  private scrollOptionIntoView() {
    // Wait for render cycle then scroll focused option into view
    requestAnimationFrame(() => {
      const li = this.el.shadowRoot?.querySelector<HTMLLIElement>('.fb-option.focused');
      li?.scrollIntoView({ block: 'nearest' });
    });
  }

  // ── Render ────────────────────────────────────────────────────────────

  render() {
    const filtered       = this.filteredOptions;
    const enabledFiltered = filtered.filter(o => !o.disabled);
    const hasHelper      = !!this.helperText;
    const showClear      = this.clearable && this.hasValue && !this.isDisabled;
    const activeOptId    = this.open && this.focusedIndex >= 0 && enabledFiltered[this.focusedIndex]
      ? `${this.listboxId}-opt-${enabledFiltered[this.focusedIndex].value}`
      : undefined;

    return (
      <Host>
        <div class="fb-combobox-wrapper">

          {this.label && (
            <label id={this.labelId} htmlFor={this.inputId} class="fb-label">
              {this.label}
              {this.required && <span class="required-indicator" aria-hidden="true"> *</span>}
            </label>
          )}

          {/* Container with position:relative so the listbox can be absolute */}
          <div class="fb-combobox-container">

            <div class={{
              'fb-combobox-field': true,
              [`size-${this.size}`]: true,
              'state-error': this.isError,
              'state-disabled': this.isDisabled,
              'is-open': this.open,
            }}>
              {/* Search icon */}
              <span class="search-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </span>

              {/*
                The <input> carries all ARIA combobox attributes.
                role="combobox" + aria-autocomplete="list" + aria-expanded + aria-controls
                is the ARIA 1.2 pattern for a combobox with a listbox popup.
              */}
              <input
                id={this.inputId}
                ref={el => this.inputEl = el as HTMLInputElement}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={this.open ? 'true' : 'false'}
                aria-controls={this.listboxId}
                aria-activedescendant={activeOptId}
                aria-required={this.required ? 'true' : null}
                aria-invalid={this.isError ? 'true' : null}
                aria-describedby={hasHelper ? this.helperId : null}
                aria-labelledby={this.label ? this.labelId : null}
                disabled={this.isDisabled}
                value={this.inputValue}
                placeholder={this.placeholder}
                class="native-input"
                autoComplete="off"
                spellcheck={false}
                onInput={this.handleInput}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
              />

              {/* Clear button */}
              {showClear && (
                <button
                  type="button"
                  class="icon-btn clear-btn"
                  aria-label="Clear"
                  tabIndex={-1}
                  onMouseDown={e => e.preventDefault()}
                  onClick={this.handleClear}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2.2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}

              {/* Chevron toggle */}
              <span class={{ 'chevron': true, 'chevron--open': this.open }} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.8"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </span>
            </div>

            {/* Listbox popup — rendered directly inside the container so
                position:absolute is relative to the field width */}
            {this.open && (
              <ul
                id={this.listboxId}
                role="listbox"
                aria-label={this.label || 'Options'}
                class="fb-listbox"
              >
                {filtered.length === 0 ? (
                  <li class="fb-option fb-option--empty" role="option" aria-disabled="true">
                    {this.noResultsText}
                  </li>
                ) : (
                  filtered.map(opt => {
                    const isSelected = this.value === opt.value;
                    const isFocused  = enabledFiltered[this.focusedIndex]?.value === opt.value;
                    const optId      = `${this.listboxId}-opt-${opt.value}`;

                    return (
                      <li
                        key={opt.value}
                        id={optId}
                        role="option"
                        aria-selected={isSelected ? 'true' : 'false'}
                        aria-disabled={opt.disabled ? 'true' : null}
                        class={{
                          'fb-option': true,
                          'selected': isSelected,
                          'focused': isFocused,
                          'disabled': !!opt.disabled,
                        }}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => this.selectOption(opt)}
                      >
                        <span class="option-label">{opt.label}</span>
                        {isSelected && (
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24"
                               fill="none" stroke="currentColor" stroke-width="2"
                               stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
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
