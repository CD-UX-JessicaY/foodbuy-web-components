import { Component, Prop, State, Event, EventEmitter, Element, Listen, Watch, h, Host } from '@stencil/core';

let idCounter = 0;

@Component({
  tag: 'fb-popover',
  styleUrl: 'fb-popover.css',
  shadow: true,
})
export class FbPopover {
  @Element() el!: HTMLElement;

  @Prop() heading: string = '';
  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Prop({ mutable: true }) open: boolean = false;

  @State() _open: boolean = false;

  @Event() fbOpen: EventEmitter<void>;
  @Event() fbClose: EventEmitter<void>;

  private triggerId: string;
  private popoverId: string;
  private triggerEl: HTMLElement | null = null;

  connectedCallback() {
    idCounter++;
    this.triggerId = `fb-popover-trigger-${idCounter}`;
    this.popoverId = `fb-popover-content-${idCounter}`;
  }

  @Watch('open')
  onOpenChange(val: boolean) {
    this._open = val;
  }

  @Listen('click', { target: 'document' })
  onDocumentClick(e: MouseEvent) {
    if (this._open && !this.el.contains(e.target as Node)) this.closePopover();
  }

  private toggle() {
    this._open ? this.closePopover() : this.openPopover();
  }

  private openPopover() {
    this.triggerEl = this.el.shadowRoot?.querySelector<HTMLElement>(`#${this.triggerId}`) ?? null;
    this._open = true;
    this.fbOpen.emit();
    requestAnimationFrame(() => {
      this.el.shadowRoot?.querySelector<HTMLElement>('.fb-popover__close')?.focus();
    });
  }

  private closePopover() {
    this._open = false;
    this.fbClose.emit();
    this.triggerEl?.focus();
  }

  private getFocusableElements(): HTMLElement[] {
    return Array.from(
      this.el.shadowRoot?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.closePopover();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = this.getFocusableElements();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || this.el.shadowRoot?.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || this.el.shadowRoot?.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  render() {
    return (
      <Host>
        <span class="fb-popover-anchor">
          <button
            id={this.triggerId}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={this._open ? 'true' : 'false'}
            aria-controls={this._open ? this.popoverId : null}
            class="fb-popover-trigger"
            onClick={() => this.toggle()}
          >
            <slot name="trigger">Open</slot>
          </button>

          {this._open && (
            <div
              id={this.popoverId}
              role="dialog"
              aria-modal="false"
              aria-label={this.heading || 'Popover'}
              class={`fb-popover fb-popover--${this.placement}`}
              onKeyDown={this.handleKeyDown}
            >
              <div class="fb-popover__header">
                {this.heading && <span class="fb-popover__heading">{this.heading}</span>}
                <button
                  type="button"
                  class="fb-popover__close"
                  aria-label="Close popover"
                  onClick={() => this.closePopover()}
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div class="fb-popover__body">
                <slot />
              </div>
            </div>
          )}
        </span>
      </Host>
    );
  }
}
