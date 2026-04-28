import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let idCounter = 0;

@Component({
  tag: 'fb-radio-group',
  styleUrl: 'fb-radio-group.css',
  shadow: true,
})
export class FbRadioGroup {
  /** Group label — rendered as <legend> inside a <fieldset> */
  @Prop() label: string = '';

  @Prop() options: RadioOption[] | string = '[]';
  @Prop({ mutable: true }) value: string = '';
  @Prop() required: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() helperText: string = '';
  @Prop() state: 'default' | 'error' = 'default';

  @Event() fbChange: EventEmitter<string>;

  private groupName: string;
  private helperId: string;

  connectedCallback() {
    idCounter++;
    this.groupName = `fb-radio-group-${idCounter}`;
    this.helperId  = `fb-radio-helper-${idCounter}`;
  }

  private get parsedOptions(): RadioOption[] {
    if (typeof this.options === 'string') {
      try { return JSON.parse(this.options); } catch { return []; }
    }
    return this.options;
  }

  private get isError() { return this.state === 'error'; }

  render() {
    const options   = this.parsedOptions;
    const hasHelper = !!this.helperText;

    return (
      <Host>
        {/*
          <fieldset> + <legend> is the WCAG-required pattern for radio groups.
          Screen readers announce the legend text with every radio option,
          so users always know the context (e.g. "Delivery frequency — Weekly").
        */}
        <fieldset
          class={{ 'fb-radio-group': true, 'has-error': this.isError }}
          disabled={this.disabled}
          aria-describedby={hasHelper ? this.helperId : null}
          aria-required={this.required ? 'true' : null}
        >
          {this.label && <legend class="fb-legend">{this.label}</legend>}

          <div class="options-list">
            {options.map((opt) => {
              const optId = `${this.groupName}-${opt.value}`;
              return (
                <label
                  key={opt.value}
                  htmlFor={optId}
                  class={{
                    'fb-radio-label': true,
                    'disabled': opt.disabled || this.disabled,
                  }}
                >
                  <input
                    id={optId}
                    type="radio"
                    name={this.groupName}
                    value={opt.value}
                    checked={this.value === opt.value}
                    disabled={opt.disabled || this.disabled}
                    required={this.required}
                    class="native-radio"
                    onChange={() => {
                      this.value = opt.value;
                      this.fbChange.emit(opt.value);
                    }}
                  />
                  <span aria-hidden="true" class={{ 'radio-dot': true, 'checked': this.value === opt.value }} />
                  <span class="option-label">{opt.label}</span>
                </label>
              );
            })}
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
        </fieldset>
      </Host>
    );
  }
}
