import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'default' | 'lg';
export type IconPosition = 'none' | 'left' | 'right' | 'only';

@Component({
  tag: 'fb-button',
  styleUrl: 'fb-button.css',
  shadow: true,
})
export class FbButton {
  /** Visual style of the button */
  @Prop() variant: ButtonVariant = 'default';

  /** Size of the button */
  @Prop() size: ButtonSize = 'default';

  /** Position of the icon slot relative to the label */
  @Prop() iconPosition: IconPosition = 'none';

  /** Full pill / circle border radius */
  @Prop() rounded: boolean = false;

  /** Disables the button */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Accessible label — required when iconPosition="only".
   * For buttons with visible text this is set automatically from slot content,
   * but icon-only buttons have no visible text so this must be provided.
   */
  @Prop() label: string;

  /** HTML type attribute */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Fired when the button is clicked (not fired when disabled) */
  @Event() fbClick: EventEmitter<void>;

  private handleClick = () => {
    if (!this.disabled) {
      this.fbClick.emit();
    }
  };

  render() {
    const isIconOnly = this.iconPosition === 'only';

    return (
      <Host>
        <button
          type={this.type}
          disabled={this.disabled}
          aria-disabled={this.disabled ? 'true' : null}
          aria-label={isIconOnly && this.label ? this.label : null}
          class={{
            'fb-button': true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
            'rounded': this.rounded,
            'icon-only': isIconOnly,
            'disabled': this.disabled,
          }}
          onClick={this.handleClick}
        >
          {this.iconPosition === 'left' && (
            <span class="icon icon--left" aria-hidden="true">
              <slot name="icon-left" />
            </span>
          )}

          {!isIconOnly && (
            <span class="label">
              <slot />
            </span>
          )}

          {this.iconPosition === 'right' && (
            <span class="icon icon--right" aria-hidden="true">
              <slot name="icon-right" />
            </span>
          )}

          {isIconOnly && (
            <span class="icon icon--only" aria-hidden="true">
              <slot name="icon" />
            </span>
          )}
        </button>
      </Host>
    );
  }
}
