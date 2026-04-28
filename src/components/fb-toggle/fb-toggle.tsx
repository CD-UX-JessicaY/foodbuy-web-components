import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'sm' | 'default' | 'lg';

@Component({
  tag: 'fb-toggle',
  styleUrl: 'fb-toggle.css',
  shadow: true,
})
export class FbToggle {
  @Prop() variant: ToggleVariant = 'default';
  @Prop() size: ToggleSize = 'default';
  @Prop({ mutable: true, reflect: true }) pressed: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  /** aria-label — required for icon-only toggles */
  @Prop() label: string;

  @Event() fbPressedChange: EventEmitter<boolean>;

  private handleClick = () => {
    if (this.disabled) return;
    this.pressed = !this.pressed;
    this.fbPressedChange.emit(this.pressed);
  };

  render() {
    return (
      <Host>
        <button
          type="button"
          class={{
            'fb-toggle': true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
            'pressed': this.pressed,
            'disabled': this.disabled,
          }}
          aria-pressed={String(this.pressed)}
          aria-label={this.label || null}
          disabled={this.disabled}
          onClick={this.handleClick}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
