import { Component, Prop, h, Host } from '@stencil/core';

export type SpinnerSize = 'sm' | 'default' | 'lg';

@Component({
  tag: 'fb-spinner',
  styleUrl: 'fb-spinner.css',
  shadow: true,
})
export class FbSpinner {
  /** Size of the spinner */
  @Prop() size: SpinnerSize = 'default';

  /** Accessible label announced to screen readers */
  @Prop() label: string = 'Loading, please wait';

  render() {
    return (
      <Host>
        <span
          role="status"
          aria-label={this.label}
          class={{ 'fb-spinner': true, [`size-${this.size}`]: true }}
        >
          {/* SVG is decorative — the role+aria-label on the parent does the announcing */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            class="spinner-svg"
          >
            <circle
              class="track"
              cx="12" cy="12" r="10"
              stroke-width="2.5"
            />
            <path
              class="arc"
              d="M12 2a10 10 0 0 1 10 10"
              stroke-width="2.5"
              stroke-linecap="round"
            />
          </svg>
          {/* Visually hidden text as a belt-and-suspenders fallback for older AT */}
          <span class="visually-hidden">{this.label}</span>
        </span>
      </Host>
    );
  }
}
