import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'fb-card',
  styleUrl: 'fb-card.css',
  shadow: true,
})
export class FbCard {
  @Prop() href: string = '';
  @Prop() clickable: boolean = false;
  @Prop() label: string = '';
  @Prop() padding: 'none' | 'sm' | 'default' | 'lg' = 'default';
  @Prop() shadow: 'none' | 'sm' | 'default' | 'lg' = 'default';

  @Event() fbCardClick: EventEmitter<void>;

  render() {
    const classes = {
      'fb-card': true,
      [`fb-card--padding-${this.padding}`]: true,
      [`fb-card--shadow-${this.shadow}`]: true,
      'fb-card--clickable': this.clickable || !!this.href,
    };

    // Clickable cards must be real interactive elements for keyboard and AT support
    if (this.href) {
      return (
        <Host>
          <a
            href={this.href}
            class={classes}
            aria-label={this.label || null}
          >
            <slot name="header" />
            <slot />
            <slot name="footer" />
          </a>
        </Host>
      );
    }

    if (this.clickable) {
      return (
        <Host>
          <button
            type="button"
            class={classes}
            aria-label={this.label || null}
            onClick={() => this.fbCardClick.emit()}
          >
            <slot name="header" />
            <slot />
            <slot name="footer" />
          </button>
        </Host>
      );
    }

    return (
      <Host>
        <div class={classes}>
          <slot name="header" />
          <slot />
          <slot name="footer" />
        </div>
      </Host>
    );
  }
}
