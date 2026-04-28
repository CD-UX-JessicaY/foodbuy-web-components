import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export type TabsVariant = 'underline' | 'pill';
export type TabsSize    = 'sm' | 'default' | 'lg';

let idCounter = 0;

@Component({
  tag: 'fb-tabs',
  styleUrl: 'fb-tabs.css',
  shadow: true,
})
export class FbTabs {
  @Prop() tabs: TabItem[] | string = '[]';
  @Prop({ mutable: true }) activeTab: string = '';
  @Prop() variant: TabsVariant = 'underline';
  @Prop() size: TabsSize = 'default';
  @Prop() fullWidth: boolean = false;
  @Prop() label: string = 'Page sections';

  @State() _activeTab: string = '';

  @Event() fbTabChange: EventEmitter<string>;

  private baseId: string;

  connectedCallback() {
    idCounter++;
    this.baseId   = `fb-tabs-${idCounter}`;
    this._activeTab = this.activeTab || this.parsedTabs.find(t => !t.disabled)?.id || '';
  }

  private get parsedTabs(): TabItem[] {
    if (typeof this.tabs === 'string') {
      try { return JSON.parse(this.tabs); } catch { return []; }
    }
    return this.tabs;
  }

  private tabId(id: string)   { return `${this.baseId}-tab-${id}`; }
  private panelId(id: string) { return `${this.baseId}-panel-${id}`; }

  private activate(id: string) {
    this._activeTab = id;
    this.fbTabChange.emit(id);
  }

  private handleKeyDown = (e: KeyboardEvent, currentIndex: number) => {
    const enabled = this.parsedTabs.filter(t => !t.disabled);
    const pos     = enabled.findIndex(t => t.id === this.parsedTabs[currentIndex]?.id);

    let target: TabItem | undefined;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        target = enabled[(pos + 1) % enabled.length];
        break;
      case 'ArrowLeft':
        e.preventDefault();
        target = enabled[(pos - 1 + enabled.length) % enabled.length];
        break;
      case 'Home':
        e.preventDefault();
        target = enabled[0];
        break;
      case 'End':
        e.preventDefault();
        target = enabled[enabled.length - 1];
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.activate(this.parsedTabs[currentIndex].id);
        return;
    }

    if (target) {
      this.activate(target.id);
      // Move DOM focus to the newly active tab button
      const tabEl = this.el?.shadowRoot?.querySelector<HTMLButtonElement>(`#${this.tabId(target.id)}`);
      tabEl?.focus();
    }
  };

  // Store element ref for focus management
  private el: HTMLElement;

  render() {
    const tabs   = this.parsedTabs;
    const active = this._activeTab || tabs.find(t => !t.disabled)?.id;

    return (
      <Host ref={(el: HTMLElement) => this.el = el}>
        {/*
          role="tablist" + aria-label: announces the purpose of the tab group.
          Each tab has role="tab", aria-selected, aria-controls.
          Only the active tab has tabindex="0"; all others are tabindex="-1".
          This means Tab moves into/out of the group, Arrow keys move between tabs.
        */}
        <div
          role="tablist"
          aria-label={this.label}
          class={{
            'fb-tablist': true,
            [`variant-${this.variant}`]: true,
            'full-width': this.fullWidth,
          }}
        >
          {tabs.map((tab, index) => {
            const isActive   = tab.id === active;
            const isDisabled = !!tab.disabled;

            return (
              <button
                key={tab.id}
                id={this.tabId(tab.id)}
                role="tab"
                aria-selected={isActive ? 'true' : 'false'}
                aria-controls={this.panelId(tab.id)}
                aria-disabled={isDisabled ? 'true' : null}
                tabindex={isActive ? 0 : -1}
                disabled={isDisabled}
                class={{
                  'fb-tab': true,
                  [`size-${this.size}`]: true,
                  'active': isActive,
                  'disabled': isDisabled,
                  'full-width': this.fullWidth,
                }}
                onClick={() => !isDisabled && this.activate(tab.id)}
                onKeyDown={(e) => !isDisabled && this.handleKeyDown(e, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab panels — all rendered, inactive ones are hidden */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={this.panelId(tab.id)}
            role="tabpanel"
            aria-labelledby={this.tabId(tab.id)}
            tabindex={0}
            hidden={tab.id !== active}
            class="fb-tabpanel"
          >
            <slot name={tab.id} />
          </div>
        ))}
      </Host>
    );
  }
}
