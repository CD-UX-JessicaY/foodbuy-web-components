import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  children?: SidebarItem[];
  disabled?: boolean;
}

let idCounter = 0;

@Component({
  tag: 'fb-sidebar',
  styleUrl: 'fb-sidebar.css',
  shadow: true,
})
export class FbSidebar {
  @Prop() items: SidebarItem[] | string = '[]';
  @Prop() label: string = 'Main navigation';
  @Prop({ mutable: true }) activeId: string = '';
  @Prop() collapsed: boolean = false;

  @State() expandedIds: Set<string> = new Set();

  @Event() fbNavigate: EventEmitter<string>;

  private _instanceId: number;

  connectedCallback() {
    idCounter++;
    this._instanceId = idCounter;
  }

  private get parsedItems(): SidebarItem[] {
    if (typeof this.items === 'string') {
      try { return JSON.parse(this.items); } catch { return []; }
    }
    return this.items;
  }

  private toggleExpand(id: string) {
    const next = new Set(this.expandedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    this.expandedIds = next;
  }

  private navigate(item: SidebarItem) {
    if (item.disabled) return;
    this.activeId = item.id;
    this.fbNavigate.emit(item.id);
  }

  private panelId(id: string) { return `fb-sidebar-panel-${this._instanceId}-${id}`; }
  private triggerId(id: string) { return `fb-sidebar-trigger-${this._instanceId}-${id}`; }

  private renderItems(items: SidebarItem[], depth = 0) {
    return items.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded  = this.expandedIds.has(item.id);
      const isActive    = this.activeId === item.id;

      return (
        <li key={item.id} class="fb-sidebar__item">
          {hasChildren ? (
            <div>
              <button
                id={this.triggerId(item.id)}
                type="button"
                aria-expanded={isExpanded ? 'true' : 'false'}
                aria-controls={this.panelId(item.id)}
                disabled={item.disabled}
                class={{
                  'fb-sidebar__link': true,
                  'fb-sidebar__link--group': true,
                  [`fb-sidebar__link--depth-${depth}`]: true,
                  'fb-sidebar__link--disabled': !!item.disabled,
                }}
                onClick={() => this.toggleExpand(item.id)}
              >
                {item.icon && <span class="fb-sidebar__icon" aria-hidden="true" innerHTML={item.icon} />}
                {!this.collapsed && <span class="fb-sidebar__label">{item.label}</span>}
                {!this.collapsed && (
                  <svg
                    aria-hidden="true"
                    class={{ 'fb-sidebar__chevron': true, 'fb-sidebar__chevron--open': isExpanded }}
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                )}
              </button>
              {isExpanded && (
                <ul id={this.panelId(item.id)} role="list" class="fb-sidebar__submenu">
                  {this.renderItems(item.children!, depth + 1)}
                </ul>
              )}
            </div>
          ) : (
            item.href
              ? (
                <a
                  href={item.href}
                  aria-current={isActive ? 'page' : null}
                  aria-disabled={item.disabled ? 'true' : null}
                  class={{
                    'fb-sidebar__link': true,
                    'fb-sidebar__link--active': isActive,
                    [`fb-sidebar__link--depth-${depth}`]: true,
                    'fb-sidebar__link--disabled': !!item.disabled,
                  }}
                  onClick={(e) => { e.preventDefault(); this.navigate(item); }}
                >
                  {item.icon && <span class="fb-sidebar__icon" aria-hidden="true" innerHTML={item.icon} />}
                  {!this.collapsed && <span class="fb-sidebar__label">{item.label}</span>}
                </a>
              )
              : (
                <button
                  type="button"
                  aria-current={isActive ? 'page' : null}
                  disabled={item.disabled}
                  class={{
                    'fb-sidebar__link': true,
                    'fb-sidebar__link--active': isActive,
                    [`fb-sidebar__link--depth-${depth}`]: true,
                    'fb-sidebar__link--disabled': !!item.disabled,
                  }}
                  onClick={() => this.navigate(item)}
                >
                  {item.icon && <span class="fb-sidebar__icon" aria-hidden="true" innerHTML={item.icon} />}
                  {!this.collapsed && <span class="fb-sidebar__label">{item.label}</span>}
                </button>
              )
          )}
        </li>
      );
    });
  }

  render() {
    const items = this.parsedItems;

    return (
      <Host>
        <nav
          aria-label={this.label}
          class={{ 'fb-sidebar': true, 'fb-sidebar--collapsed': this.collapsed }}
        >
          <ul role="list" class="fb-sidebar__list">
            {this.renderItems(items)}
          </ul>
          <slot name="footer" />
        </nav>
      </Host>
    );
  }
}
