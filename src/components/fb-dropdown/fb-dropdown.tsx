import { Component, Prop, State, Event, EventEmitter, Element, Listen, h, Host } from '@stencil/core';

export interface DropdownItem {
  id: string;
  label: string;
  disabled?: boolean;
  danger?: boolean;
}

let idCounter = 0;

@Component({
  tag: 'fb-dropdown',
  styleUrl: 'fb-dropdown.css',
  shadow: true,
})
export class FbDropdown {
  @Element() el!: HTMLElement;

  @Prop() label: string = 'Actions';
  @Prop() items: DropdownItem[] | string = '[]';
  @Prop() disabled: boolean = false;
  @Prop() variant: 'default' | 'secondary' | 'ghost' = 'secondary';

  @State() open: boolean = false;
  @State() focusedIndex: number = 0;

  @Event() fbSelect: EventEmitter<string>;

  private triggerId: string;
  private menuId: string;

  connectedCallback() {
    idCounter++;
    this.triggerId = `fb-dropdown-trigger-${idCounter}`;
    this.menuId    = `fb-dropdown-menu-${idCounter}`;
  }

  @Listen('click', { target: 'document' })
  onDocumentClick(e: MouseEvent) {
    if (this.open && !this.el.contains(e.target as Node)) this.close();
  }

  private get parsedItems(): DropdownItem[] {
    if (typeof this.items === 'string') {
      try { return JSON.parse(this.items); } catch { return []; }
    }
    return this.items;
  }

  private get enabledItems() { return this.parsedItems.filter(i => !i.disabled); }

  private toggle() {
    this.open ? this.close() : this.openMenu();
  }

  private openMenu() {
    if (this.disabled) return;
    this.open = true;
    this.focusedIndex = 0;
    requestAnimationFrame(() => this.focusItem(0));
  }

  private close() {
    this.open = false;
    this.el.shadowRoot?.querySelector<HTMLButtonElement>(`#${this.triggerId}`)?.focus();
  }

  private select(item: DropdownItem) {
    if (item.disabled) return;
    this.fbSelect.emit(item.id);
    this.close();
  }

  private focusItem(index: number) {
    const items = this.el.shadowRoot?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
    items?.[index]?.focus();
  }

  private handleTriggerKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter': case ' ': case 'ArrowDown':
        e.preventDefault();
        if (!this.open) this.openMenu();
        else { this.focusedIndex = 0; this.focusItem(0); }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.open) this.openMenu();
        else { const last = this.enabledItems.length - 1; this.focusedIndex = last; this.focusItem(last); }
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
    }
  };

  private handleMenuKeyDown = (e: KeyboardEvent) => {
    const enabled = this.enabledItems;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % enabled.length;
        this.focusItem(this.focusedIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusedIndex = (this.focusedIndex - 1 + enabled.length) % enabled.length;
        this.focusItem(this.focusedIndex);
        break;
      case 'Home':
        e.preventDefault();
        this.focusedIndex = 0;
        this.focusItem(0);
        break;
      case 'End':
        e.preventDefault();
        this.focusedIndex = enabled.length - 1;
        this.focusItem(enabled.length - 1);
        break;
      case 'Escape': case 'Tab':
        e.preventDefault();
        this.close();
        break;
    }
  };

  render() {
    const items = this.parsedItems;

    return (
      <Host style={{ position: 'relative', display: 'inline-block' }}>
        <button
          id={this.triggerId}
          type="button"
          aria-haspopup="true"
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls={this.menuId}
          disabled={this.disabled}
          class={{ 'fb-trigger': true, [`variant-${this.variant}`]: true }}
          onClick={() => this.toggle()}
          onKeyDown={this.handleTriggerKeyDown}
        >
          <slot name="trigger">{this.label}</slot>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class={{ 'chevron': true, 'chevron--open': this.open }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        {this.open && (
          <ul
            id={this.menuId}
            role="menu"
            aria-label={this.label}
            class="fb-menu"
            onKeyDown={this.handleMenuKeyDown}
          >
            {items.map(item => (
              <li key={item.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  aria-disabled={item.disabled ? 'true' : null}
                  class={{ 'fb-menuitem': true, 'danger': !!item.danger, 'disabled': !!item.disabled }}
                  tabindex={item.disabled ? -1 : 0}
                  onClick={() => this.select(item)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Host>
    );
  }
}
