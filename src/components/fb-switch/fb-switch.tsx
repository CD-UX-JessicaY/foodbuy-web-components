import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

let idCounter = 0;

@Component({
  tag: 'fb-switch',
  styleUrl: 'fb-switch.css',
  shadow: true,
})
export class FbSwitch {
  /** Visible label */
  @Prop() label: string = '';

  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() helperText: string = '';

  @Event() fbChange: EventEmitter<boolean>;

  private switchId: string;
  private helperId: string;

  connectedCallback() {
    idCounter++;
    this.switchId = `fb-switch-${idCounter}`;
    this.helperId = `fb-switch-helper-${idCounter}`;
  }

  render() {
    const hasHelper = !!this.helperText;

    return (
      <Host>
        <div class="fb-switch-wrapper">
          <label
            htmlFor={this.switchId}
            class={{ 'fb-switch-label': true, 'disabled': this.disabled }}
          >
            {/*
              role="switch" on a <button> is the ARIA pattern.
              We use a visually-hidden <input type="checkbox"> + a custom track
              so native form semantics (name/value submission) are preserved.
            */}
            <input
              id={this.switchId}
              type="checkbox"
              role="switch"
              checked={this.checked}
              disabled={this.disabled}
              aria-label={!this.label ? 'Toggle' : null}
              aria-checked={this.checked ? 'true' : 'false'}
              aria-describedby={hasHelper ? this.helperId : null}
              class="native-switch"
              onChange={(e) => {
                this.checked = (e.target as HTMLInputElement).checked;
                this.fbChange.emit(this.checked);
              }}
            />

            {/* Custom visual track */}
            <span aria-hidden="true" class={{ 'switch-track': true, 'on': this.checked }}>
              <span class="switch-thumb" />
            </span>

            {this.label && <span class="label-text">{this.label}</span>}
          </label>

          {hasHelper && (
            <div id={this.helperId} class="fb-helper">{this.helperText}</div>
          )}
        </div>
      </Host>
    );
  }
}
