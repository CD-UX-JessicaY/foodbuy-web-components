import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type CheckboxState = 'default' | 'error' | 'disabled';
export type CheckboxSize  = 'sm' | 'md' | 'lg';

let idCounter = 0;

@Component({
  tag: 'fb-checkbox',
  styleUrl: 'fb-checkbox.css',
  shadow: true,
})
export class FbCheckbox {
  /** Visible label */
  @Prop() label: string = '';

  @Prop({ mutable: true }) checked: boolean = false;
  /** Shows a dash/minus — used for "select all" when some items are selected */
  @Prop() indeterminate: boolean = false;
  @Prop() state: CheckboxState = 'default';
  @Prop() size: CheckboxSize = 'md';
  @Prop() helperText: string = '';
  @Prop() required: boolean = false;
  /** Explicit value used when inside a form */
  @Prop() value: string = 'on';

  @Event() fbChange: EventEmitter<boolean>;

  private inputId: string;
  private helperId: string;

  connectedCallback() {
    idCounter++;
    this.inputId  = `fb-checkbox-${idCounter}`;
    this.helperId = `fb-checkbox-helper-${idCounter}`;
  }

  private get isDisabled() { return this.state === 'disabled'; }
  private get isError()    { return this.state === 'error'; }

  render() {
    const hasHelper = !!this.helperText;

    return (
      <Host>
        <div class="fb-checkbox-wrapper">
          <label
            htmlFor={this.inputId}
            class={{
              'fb-checkbox-label': true,
              'disabled': this.isDisabled,
            }}
          >
            {/*
              Native <input type="checkbox"> gives us:
              - Keyboard (Space to toggle) for free
              - Correct screen reader announcement
              - Native form submission support
              We visually hide it and style a custom box on top.
            */}
            <input
              id={this.inputId}
              type="checkbox"
              checked={this.checked}
              disabled={this.isDisabled}
              required={this.required}
              value={this.value}
              aria-label={!this.label ? 'Checkbox' : null}
              aria-required={this.required ? 'true' : null}
              aria-invalid={this.isError ? 'true' : null}
              aria-describedby={hasHelper ? this.helperId : null}
              // indeterminate must be set as a property, not attribute
              ref={(el) => { if (el) el.indeterminate = this.indeterminate; }}
              class="native-checkbox"
              onChange={(e) => {
                this.checked = (e.target as HTMLInputElement).checked;
                this.fbChange.emit(this.checked);
              }}
            />

            {/* Custom visual checkbox box */}
            <span
              aria-hidden="true"
              class={{
                'checkbox-box': true,
                [`size-${this.size}`]: true,
                'checked': this.checked || this.indeterminate,
                'error': this.isError,
              }}
            >
              {this.indeterminate
                ? <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M1 1h8" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
                : this.checked
                  ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  : null
              }
            </span>

            {this.label && <span class="label-text">{this.label}</span>}
          </label>

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
