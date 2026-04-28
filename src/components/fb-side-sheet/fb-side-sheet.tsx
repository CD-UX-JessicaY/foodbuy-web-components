import { Component, Prop, State, Event, EventEmitter, Element, Watch, Listen, h, Host } from '@stencil/core';

let idCounter = 0;

@Component({
  tag: 'fb-side-sheet',
  styleUrl: 'fb-side-sheet.css',
  shadow: true,
})
export class FbSideSheet {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) open: boolean = false;
  @Prop() heading: string = '';
  @Prop() side: 'left' | 'right' = 'right';
  @Prop() size: 'sm' | 'default' | 'lg' = 'default';

  @State() _open: boolean = false;

  @Event() fbClose: EventEmitter<void>;

  private sheetId: string;
  private headingId: string;
  private triggerElement: Element | null = null;

  connectedCallback() {
    idCounter++;
    this.sheetId   = `fb-side-sheet-${idCounter}`;
    this.headingId = `fb-side-sheet-heading-${idCounter}`;
  }

  @Watch('open')
  onOpenChange(val: boolean) {
    if (val && !this._open) {
      this.triggerElement = document.activeElement;
      this._open = true;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        this.el.shadowRoot?.querySelector<HTMLElement>('.fb-side-sheet__close')?.focus();
      });
    } else if (!val && this._open) {
      this._open = false;
      document.body.style.overflow = '';
      (this.triggerElement as HTMLElement)?.focus?.();
    }
  }

  @Listen('keydown', { target: 'window' })
  onWindowKeydown(e: KeyboardEvent) {
    if (!this._open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
    if (e.key === 'Tab') {
      this.trapFocus(e);
    }
  }

  private trapFocus(e: KeyboardEvent) {
    const focusable = Array.from(
      this.el.shadowRoot?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const active = this.el.shadowRoot?.activeElement;
    if (e.shiftKey) {
      if (active === first) { e.preventDefault(); last.focus(); }
    } else {
      if (active === last)  { e.preventDefault(); first.focus(); }
    }
  }

  private close() {
    this.open = false;
    this.fbClose.emit();
    this._open = false;
    document.body.style.overflow = '';
    (this.triggerElement as HTMLElement)?.focus?.();
  }

  render() {
    if (!this._open && !this.open) return <Host />;

    return (
      <Host>
        <div
          class="fb-side-sheet__overlay"
          aria-hidden="true"
          onClick={() => this.close()}
        />
        <div
          id={this.sheetId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={this.headingId}
          class={{
            'fb-side-sheet': true,
            [`fb-side-sheet--${this.side}`]: true,
            [`fb-side-sheet--${this.size}`]: true,
            'fb-side-sheet--open': this._open || this.open,
          }}
        >
          <div class="fb-side-sheet__header">
            {this.heading
              ? <h2 id={this.headingId} class="fb-side-sheet__heading">{this.heading}</h2>
              : <span id={this.headingId}><slot name="heading" /></span>
            }
            <button
              type="button"
              class="fb-side-sheet__close"
              aria-label="Close panel"
              onClick={() => this.close()}
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="fb-side-sheet__body">
            <slot />
          </div>
          <div class="fb-side-sheet__footer">
            <slot name="footer" />
          </div>
        </div>
      </Host>
    );
  }
}
