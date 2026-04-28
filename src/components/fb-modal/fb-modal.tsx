import { Component, Prop, Watch, Event, EventEmitter, Element, h, Host } from '@stencil/core';

export type ModalSize = 'sm' | 'default' | 'lg' | 'fullscreen';

let idCounter = 0;

@Component({
  tag: 'fb-modal',
  styleUrl: 'fb-modal.css',
  shadow: true,
})
export class FbModal {
  @Element() el!: HTMLElement;

  @Prop() open: boolean = false;
  @Prop() size: ModalSize = 'default';
  @Prop() heading: string = '';
  @Prop() description: string = '';
  @Prop() showFooter: boolean = true;
  @Prop() closeOnOverlay: boolean = true;
  @Prop() confirmLabel: string = 'Confirm';
  @Prop() cancelLabel: string = 'Cancel';

  @Event() fbClose: EventEmitter<void>;
  @Event() fbConfirm: EventEmitter<void>;

  private titleId: string;
  private descId: string;
  private triggerElement: HTMLElement | null = null;

  connectedCallback() {
    idCounter++;
    this.titleId = `fb-modal-title-${idCounter}`;
    this.descId  = `fb-modal-desc-${idCounter}`;
  }

  @Watch('open')
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      // Store the element that triggered the modal so we can return focus later
      this.triggerElement = document.activeElement as HTMLElement;
      // Move focus into the modal after the next render
      requestAnimationFrame(() => this.focusFirstElement());
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Return focus to the trigger element
      this.triggerElement?.focus();
      this.triggerElement = null;
    }
  }

  private focusFirstElement() {
    const modal = this.el.shadowRoot?.querySelector<HTMLElement>('.fb-modal');
    if (!modal) return;
    const focusable = this.getFocusableElements(modal);
    focusable[0]?.focus();
  }

  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.closest('[hidden]'));
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
      return;
    }

    // Focus trap: keep Tab/Shift+Tab cycling within the modal
    if (e.key === 'Tab') {
      const modal    = this.el.shadowRoot?.querySelector<HTMLElement>('.fb-modal');
      if (!modal) return;
      const focusable = this.getFocusableElements(modal);
      if (focusable.length === 0) { e.preventDefault(); return; }

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

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

  private close() {
    this.fbClose.emit();
  }

  render() {
    if (!this.open) return <Host />;

    return (
      <Host onKeyDown={this.handleKeyDown}>
        {/* Overlay — aria-hidden so screen readers only see the dialog */}
        <div
          class="fb-overlay"
          aria-hidden="true"
          onClick={() => this.closeOnOverlay && this.close()}
        />

        {/*
          role="dialog" + aria-modal="true": tells screen readers this is a modal
          and that content behind it should be ignored.
          aria-labelledby links to the visible heading.
          aria-describedby links to the description paragraph.
        */}
        <div
          class={{ 'fb-modal': true, [`size-${this.size}`]: true }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={this.heading ? this.titleId : null}
          aria-describedby={this.description ? this.descId : null}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div class="modal-header">
            <div class="modal-heading-group">
              {this.heading && (
                <h2 id={this.titleId} class="modal-title">{this.heading}</h2>
              )}
              {this.description && (
                <p id={this.descId} class="modal-description">{this.description}</p>
              )}
            </div>
            <button
              type="button"
              class="close-btn"
              aria-label="Close dialog"
              onClick={() => this.close()}
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          {/* Body — slot allows any content */}
          <div class="modal-body">
            <slot />
          </div>

          {/* Footer */}
          {this.showFooter && (
            <div class="modal-footer">
              <button type="button" class="btn-cancel" onClick={() => this.close()}>
                {this.cancelLabel}
              </button>
              <button type="button" class="btn-confirm" onClick={() => this.fbConfirm.emit()}>
                {this.confirmLabel}
              </button>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
