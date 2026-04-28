import { Component, Prop, h, Host } from '@stencil/core';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'neutral' | 'info';
export type BadgeSize = 'sm' | 'default' | 'lg';

@Component({
  tag: 'fb-badge',
  styleUrl: 'fb-badge.css',
  shadow: true,
})
export class FbBadge {
  /** Visual style */
  @Prop() variant: BadgeVariant = 'default';

  /** Size */
  @Prop() size: BadgeSize = 'default';

  /**
   * Show a dot indicator instead of text.
   * When true, provide a label prop for screen readers — the dot conveys
   * meaning through colour alone which is a WCAG failure without a text alternative.
   */
  @Prop() dot: boolean = false;

  /** Visible label text (also used as aria-label for dot variant) */
  @Prop() label: string;

  render() {
    const isDot = this.dot;

    return (
      <Host>
        <span
          class={{
            'fb-badge': true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
            'dot': isDot,
          }}
          // Dot badges rely on colour alone — the aria-label provides the text alternative
          aria-label={isDot && this.label ? this.label : null}
          role={isDot ? 'img' : null}
        >
          {isDot ? null : (this.label || <slot />)}
        </span>
      </Host>
    );
  }
}
