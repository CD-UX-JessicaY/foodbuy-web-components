import { Component, Prop, State, Event, EventEmitter, Element, h, Host } from '@stencil/core';

export type InputSize = 'sm' | 'default' | 'lg';
export type InputState = 'default' | 'error' | 'disabled' | 'read-only';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url';

let idCounter = 0;

@Component({
  tag: 'fb-input',
  styleUrl: 'fb-input.css',
  shadow: true,
})
export class FbInput {
  @Element() el!: HTMLElement;

  /** Visible label text — always provide this for accessibility */
  @Prop() label: string = '';

  /** HTML input type */
  @Prop() type: InputType = 'text';

  /** Size variant */
  @Prop() size: InputSize = 'default';

  /** Visual and interaction state */
  @Prop() state: InputState = 'default';

  /** Placeholder text */
  @Prop() placeholder: string = '';

  /** Current value */
  @Prop({ mutable: true }) value: string = '';

  /** Helper or error message shown below the input */
  @Prop() helperText: string = '';

  /** Marks the field as required */
  @Prop() required: boolean = false;

  /** Marks the field as required */
  @Prop() clearable: boolean = false;

  /** Left adornment text (e.g. "$") */
  @Prop() prefixText: string = '';

  /** Right adornment text (e.g. ".00") */
  @Prop() suffixText: string = '';

  /** Fired when the value changes */
  @Event() fbChange: EventEmitter<string>;

  /** Fired when the input receives focus */
  @Event() fbFocus: EventEmitter<void>;

  /** Fired when the input loses focus */
  @Event() fbBlur: EventEmitter<void>;

  @State() showPassword: boolean = false;

  // Stable IDs for label association and aria-describedby
  private inputId: string;
  private helperId: string;

  connectedCallback() {
    idCounter++;
    this.inputId  = `fb-input-${idCounter}`;
    this.helperId = `fb-input-helper-${idCounter}`;
  }

  private get isDisabled() { return this.state === 'disabled'; }
  private get isReadOnly() { return this.state === 'read-only'; }
  private get isError()    { return this.state === 'error'; }

  private handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    this.value = val;
    this.fbChange.emit(val);
  };

  private handleClear = () => {
    this.value = '';
    this.fbChange.emit('');
    // Return focus to the input after clearing
    this.el.shadowRoot?.querySelector('input')?.focus();
  };

  private togglePassword = () => {
    this.showPassword = !this.showPassword;
  };

  render() {
    const isPassword = this.type === 'password';
    const isSearch   = this.type === 'search';
    const inputType  = isPassword && this.showPassword ? 'text' : this.type;
    const showClear  = this.clearable && !!this.value && !this.isDisabled && !this.isReadOnly;
    const hasHelper  = !!this.helperText;

    return (
      <Host>
        <div class="fb-input-wrapper">

          {/* Label — linked to input via htmlFor/id */}
          {this.label && (
            <label htmlFor={this.inputId} class="fb-label">
              {this.label}
              {this.required && (
                <span class="required-indicator" aria-hidden="true"> *</span>
              )}
            </label>
          )}

          <div class={{
            'fb-input-field': true,
            [`size-${this.size}`]: true,
            'state-error': this.isError,
            'state-disabled': this.isDisabled,
            'state-readonly': this.isReadOnly,
          }}>

            {/* Search icon — decorative */}
            {isSearch && (
              <span class="adornment adornment--prefix-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </span>
            )}

            {/* Prefix text */}
            {this.prefixText && (
              <span class="adornment adornment--prefix" aria-hidden="true">{this.prefixText}</span>
            )}

            {/*
              The input itself.
              aria-required, aria-invalid, aria-describedby all set here —
              this is what screen readers read when the field receives focus.
            */}
            <input
              id={this.inputId}
              type={inputType}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.isDisabled}
              readOnly={this.isReadOnly}
              required={this.required}
              aria-required={this.required ? 'true' : null}
              aria-invalid={this.isError ? 'true' : null}
              aria-describedby={hasHelper ? this.helperId : null}
              class="native-input"
              onInput={this.handleInput}
              onFocus={() => this.fbFocus.emit()}
              onBlur={() => this.fbBlur.emit()}
            />

            {/* Clear button */}
            {showClear && (
              <button
                type="button"
                class="adornment-btn"
                aria-label="Clear input"
                onClick={this.handleClear}
              >
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <path d="M2 2l8 8M10 2l-8 8"/>
                </svg>
              </button>
            )}

            {/* Suffix text */}
            {this.suffixText && (
              <span class="adornment adornment--suffix" aria-hidden="true">{this.suffixText}</span>
            )}

            {/* Password toggle */}
            {isPassword && (
              <button
                type="button"
                class="adornment-btn"
                aria-label={this.showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={this.showPassword ? 'true' : 'false'}
                onClick={this.togglePassword}
              >
                {this.showPassword
                  ? <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            )}
          </div>

          {/* Helper / error text — linked to input via aria-describedby */}
          {hasHelper && (
            <div
              id={this.helperId}
              class={{ 'fb-helper': true, 'fb-helper--error': this.isError }}
              // role="alert" on error ensures it's announced immediately
              role={this.isError ? 'alert' : null}
            >
              {this.isError && (
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="helper-icon">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              )}
              {this.helperText}
            </div>
          )}

        </div>
      </Host>
    );
  }
}
