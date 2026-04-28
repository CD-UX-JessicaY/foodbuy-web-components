import { Component, Prop, State, Event, EventEmitter, Watch, h, Host } from '@stencil/core';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  tag: 'fb-toast',
  styleUrl: 'fb-toast.css',
  shadow: true,
})
export class FbToast {
  @Prop() variant: ToastVariant = 'info';
  @Prop() message: string = '';
  @Prop() visible: boolean = false;
  /** Auto-dismiss delay in ms. 0 = no auto-dismiss. Minimum recommended: 5000 */
  @Prop() duration: number = 6000;

  @State() animatingOut: boolean = false;

  @Event() fbDismiss: EventEmitter<void>;

  private timer: ReturnType<typeof setTimeout>;

  @Watch('visible')
  onVisibleChange(newVal: boolean) {
    if (newVal && this.duration > 0) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.dismiss(), this.duration);
    }
  }

  disconnectedCallback() {
    clearTimeout(this.timer);
  }

  private dismiss = () => {
    this.animatingOut = true;
    setTimeout(() => {
      this.animatingOut = false;
      this.fbDismiss.emit();
    }, 200);
  };

  render() {
    if (!this.visible) return null;

    return (
      <Host>
        {/*
          role="status" + aria-live="polite": announces to screen readers
          without interrupting what they're currently saying.
          aria-atomic="true": the full message is read, not just the changed part.
          Toasts never receive focus — they are non-blocking notifications.
        */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class={{
            'fb-toast': true,
            [`variant-${this.variant}`]: true,
            'animating-out': this.animatingOut,
          }}
        >
          <span class="toast-icon" aria-hidden="true">
            {this.variant === 'info'    && <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M9 8v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r=".75" fill="currentColor"/></svg>}
            {this.variant === 'success' && <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>}
            {this.variant === 'warning' && <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 7v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="12.5" r=".75" fill="currentColor"/></svg>}
            {this.variant === 'danger'  && <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M6 6l6 6M12 6l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>}
          </span>

          <span class="toast-message">{this.message}</span>

          <button
            type="button"
            class="dismiss-btn"
            aria-label="Dismiss notification"
            onClick={this.dismiss}
          >
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </Host>
    );
  }
}
