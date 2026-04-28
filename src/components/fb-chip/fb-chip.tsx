import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'fb-chip',
  styleUrl: 'fb-chip.css',
  shadow: true,
})
export class FbChip {
  @Prop() label: string = '';
  @Prop() variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';
  @Prop() size: 'sm' | 'default' = 'default';

  /** Makes the chip selectable (toggle). Uses role="option" + aria-selected. */
  @Prop() selectable: boolean = false;
  @Prop({ mutable: true }) selected: boolean = false;

  /** Shows a remove (×) button. Emits fbRemove. */
  @Prop() dismissible: boolean = false;
  @Prop() disabled: boolean = false;

  @Event() fbSelect: EventEmitter<boolean>;
  @Event() fbRemove: EventEmitter<void>;

  private handleClick() {
    if (this.disabled || !this.selectable) return;
    this.selected = !this.selected;
    this.fbSelect.emit(this.selected);
  }

  render() {
    const classes = {
      'fb-chip': true,
      [`fb-chip--${this.variant}`]: true,
      [`fb-chip--${this.size}`]: true,
      'fb-chip--selected': this.selected,
      'fb-chip--disabled': this.disabled,
    };

    if (this.selectable) {
      return (
        <Host>
          <button
            type="button"
            role="option"
            aria-selected={this.selected ? 'true' : 'false'}
            aria-disabled={this.disabled ? 'true' : null}
            disabled={this.disabled}
            class={classes}
            onClick={() => this.handleClick()}
          >
            <slot name="icon-left" />
            <span class="fb-chip__label">{this.label}<slot /></span>
            {this.dismissible && (
              <span
                role="button"
                aria-label={`Remove ${this.label}`}
                tabindex={this.disabled ? -1 : 0}
                class="fb-chip__remove"
                onClick={(e) => { e.stopPropagation(); if (!this.disabled) this.fbRemove.emit(); }}
                onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) { e.preventDefault(); e.stopPropagation(); this.fbRemove.emit(); } }}
              >
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </span>
            )}
          </button>
        </Host>
      );
    }

    return (
      <Host>
        <span class={classes} aria-disabled={this.disabled ? 'true' : null}>
          <slot name="icon-left" />
          <span class="fb-chip__label">{this.label}<slot /></span>
          {this.dismissible && (
            <button
              type="button"
              aria-label={`Remove ${this.label}`}
              disabled={this.disabled}
              class="fb-chip__remove"
              onClick={() => { if (!this.disabled) this.fbRemove.emit(); }}
            >
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </span>
      </Host>
    );
  }
}
