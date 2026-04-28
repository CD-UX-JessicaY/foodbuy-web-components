import { Component, Prop, State, Event, EventEmitter, Watch, h, Host } from '@stencil/core';

export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupVariant = 'default' | 'outline';
export type ToggleGroupSize = 'sm' | 'default' | 'lg';
export type ToggleGroupOrientation = 'horizontal' | 'vertical';

export interface ToggleItem {
  value: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
}

// Built-in icon set
const ICONS: Record<string, () => any> = {
  bold:        () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 3h5a2.5 2.5 0 0 1 0 5H4V3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M4 8h5.5a2.5 2.5 0 0 1 0 5H4V8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>,
  italic:      () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M7 3h5M4 13h5M9 3l-2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>,
  underline:   () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 3v5a4 4 0 0 0 8 0V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 13h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>,
  'align-left':   () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>,
  'align-center': () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4h12M4 8h8M3 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>,
  'align-right':  () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4h12M6 8h8M4 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>,
  grid:        () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>,
  list:        () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 4h10M3 8h10M3 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>,
};

@Component({
  tag: 'fb-toggle-group',
  styleUrl: 'fb-toggle-group.css',
  shadow: true,
})
export class FbToggleGroup {
  @Prop() type: ToggleGroupType = 'single';
  @Prop() variant: ToggleGroupVariant = 'default';
  @Prop() size: ToggleGroupSize = 'default';
  @Prop() orientation: ToggleGroupOrientation = 'horizontal';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() label: string = 'Toggle group';
  /** JSON array of { value, label?, icon?, disabled? } */
  @Prop() items: string = '[]';
  /** Current selection — string for single, JSON array for multiple */
  @Prop({ mutable: true }) value: string = '';

  @State() selected: Set<string> = new Set();

  @Event() fbChange: EventEmitter<string | string[]>;

  componentWillLoad() {
    this.initSelection();
  }

  @Watch('value')
  onValueChange() {
    this.initSelection();
  }

  private initSelection() {
    if (!this.value) { this.selected = new Set(); return; }
    if (this.type === 'multiple') {
      try { this.selected = new Set(JSON.parse(this.value)); } catch { this.selected = new Set(); }
    } else {
      this.selected = new Set([this.value]);
    }
  }

  private parsedItems(): ToggleItem[] {
    try { return JSON.parse(this.items); } catch { return []; }
  }

  private toggle(val: string) {
    if (this.disabled) return;
    const next = new Set(this.selected);
    if (this.type === 'single') {
      if (next.has(val)) next.delete(val); else { next.clear(); next.add(val); }
      this.selected = next;
      this.value = next.has(val) ? val : '';
      this.fbChange.emit(this.value);
    } else {
      if (next.has(val)) next.delete(val); else next.add(val);
      this.selected = next;
      const arr = Array.from(next);
      this.value = JSON.stringify(arr);
      this.fbChange.emit(arr);
    }
  }

  private borderRadius(isFirst: boolean, isLast: boolean): string {
    const r = 'var(--radius-sm)';
    const isV = this.orientation === 'vertical';
    if (isFirst && isLast) return r;
    if (isV) {
      if (isFirst) return `${r} ${r} 0 0`;
      if (isLast)  return `0 0 ${r} ${r}`;
      return '0';
    }
    if (isFirst) return `${r} 0 0 ${r}`;
    if (isLast)  return `0 ${r} ${r} 0`;
    return '0';
  }

  render() {
    const items = this.parsedItems();
    const isOutline = this.variant === 'outline';
    const isV = this.orientation === 'vertical';
    const last = items.length - 1;

    return (
      <Host>
        <div
          role="group"
          aria-label={this.label}
          aria-disabled={this.disabled ? 'true' : null}
          class={{
            'fb-toggle-group': true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
            'vertical': isV,
          }}
        >
          {items.map((item, i) => {
            const pressed = this.selected.has(item.value);
            const isDisabled = this.disabled || !!item.disabled;
            const isFirst = i === 0;
            const isLast = i === last;
            const icon = item.icon && ICONS[item.icon] ? ICONS[item.icon]() : null;

            return (
              <button
                key={item.value}
                type="button"
                role="button"
                aria-pressed={String(pressed)}
                aria-label={!item.label ? item.value : null}
                disabled={isDisabled}
                class={{
                  'item': true,
                  'pressed': pressed,
                  'disabled': isDisabled,
                  'first': isFirst,
                  'last': isLast,
                }}
                style={isOutline ? {
                  borderRadius: this.borderRadius(isFirst, isLast),
                  marginLeft: (!isV && !isFirst) ? '-1px' : null,
                  marginTop:  (isV && !isFirst)  ? '-1px' : null,
                } : {}}
                onClick={() => this.toggle(item.value)}
              >
                {icon}
                {item.label && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
