import { Component, Prop, Element, Watch, h, Host } from '@stencil/core';

export type GroupOrientation = 'horizontal' | 'vertical';

@Component({
  tag: 'fb-button-group',
  styleUrl: 'fb-button-group.css',
  shadow: true,
})
export class FbButtonGroup {
  @Element() el: HTMLElement;

  @Prop() orientation: GroupOrientation = 'horizontal';
  @Prop() variant: string;
  @Prop() size: string;

  componentDidLoad() {
    const slot = this.el.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', () => this.applyToButtons());
    this.applyToButtons();
  }

  @Watch('orientation')
  @Watch('variant')
  @Watch('size')
  applyToButtons() {
    const buttons = Array.from(this.el.querySelectorAll('fb-button')) as any[];
    if (!buttons.length) return;

    const isVertical = this.orientation === 'vertical';
    const last = buttons.length - 1;

    buttons.forEach((btn, i) => {
      const isFirst = i === 0;
      const isLast = i === last;
      const isOnly = buttons.length === 1;

      let radius: string;
      if (isOnly) {
        radius = 'var(--radius-sm)';
      } else if (isVertical) {
        if (isFirst)      radius = 'var(--radius-sm) var(--radius-sm) 0 0';
        else if (isLast)  radius = '0 0 var(--radius-sm) var(--radius-sm)';
        else              radius = '0';
      } else {
        if (isFirst)      radius = 'var(--radius-sm) 0 0 var(--radius-sm)';
        else if (isLast)  radius = '0 var(--radius-sm) var(--radius-sm) 0';
        else              radius = '0';
      }

      btn.style.setProperty('--fb-button-radius', radius);

      if (isVertical) {
        btn.style.removeProperty('margin-left');
        btn.style.setProperty('margin-top', isFirst ? '0' : '-1px');
      } else {
        btn.style.removeProperty('margin-top');
        btn.style.setProperty('margin-left', isFirst ? '0' : '-1px');
      }

      if (this.variant) btn.variant = this.variant;
      if (this.size)    btn.size = this.size;
    });
  }

  render() {
    return (
      <Host>
        <div
          role="group"
          aria-label={this.el.getAttribute('aria-label') ?? 'Button group'}
          class={{ 'fb-button-group': true, 'vertical': this.orientation === 'vertical' }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
