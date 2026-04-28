import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  tag: 'fb-alert',
  styleUrl: 'fb-alert.css',
  shadow: true,
})
export class FbAlert {
  @Prop() variant: AlertVariant = 'info';
  @Prop() heading: string = '';
  @Prop() description: string = '';
  @Prop() dismissible: boolean = false;

  @State() dismissed: boolean = false;

  @Event() fbDismiss: EventEmitter<void>;

  private handleDismiss = () => {
    this.dismissed = true;
    this.fbDismiss.emit();
  };

  render() {
    if (this.dismissed) return null;

    return (
      <Host>
        {/*
          role="alert" = aria-live="assertive" + aria-atomic="true"
          Screen reader announces the full content immediately when it appears.
          Use role="status" for non-urgent info — here we default to "alert"
          but map info/success to "status" (less intrusive).
        */}
        <div
          role={this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status'}
          class={{ 'fb-alert': true, [`variant-${this.variant}`]: true }}
        >
          <span class="alert-icon" aria-hidden="true">
            {this.variant === 'info'    && <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M9 8v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r=".75" fill="currentColor"/></svg>}
            {this.variant === 'success' && <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>}
            {this.variant === 'warning' && <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 7v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="12.5" r=".75" fill="currentColor"/></svg>}
            {this.variant === 'danger'  && <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M6 6l6 6M12 6l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>}
          </span>

          <div class="alert-content">
            {this.heading     && <p class="alert-title">{this.heading}</p>}
            {this.description && <p class="alert-description">{this.description}</p>}
            <slot />
          </div>

          {this.dismissible && (
            <button
              type="button"
              class="dismiss-btn"
              aria-label="Dismiss alert"
              onClick={this.handleDismiss}
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
