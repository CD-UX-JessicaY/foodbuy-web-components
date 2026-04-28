import { Component, Prop, State, Element, h, Host } from '@stencil/core';

let idCounter = 0;

@Component({
  tag: 'fb-tooltip',
  styleUrl: 'fb-tooltip.css',
  shadow: true,
})
export class FbTooltip {
  @Element() el!: HTMLElement;

  @Prop() content: string = '';
  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @State() visible: boolean = false;

  private tooltipId: string;

  connectedCallback() {
    idCounter++;
    this.tooltipId = `fb-tooltip-${idCounter}`;
  }

  private show() { this.visible = true; }
  private hide() { this.visible = false; }

  render() {
    return (
      <Host>
        <span
          class="fb-tooltip-wrapper"
          onMouseEnter={() => this.show()}
          onMouseLeave={() => this.hide()}
          onFocusin={() => this.show()}
          onFocusout={() => this.hide()}
        >
          {/* Slotted trigger element receives aria-describedby via wrapper attribute —
              consumers must pass a focusable element as the slot content */}
          <span aria-describedby={this.visible ? this.tooltipId : null}>
            <slot />
          </span>

          {this.visible && (
            <span
              id={this.tooltipId}
              role="tooltip"
              class={`fb-tooltip fb-tooltip--${this.placement}`}
            >
              {this.content}
            </span>
          )}
        </span>
      </Host>
    );
  }
}
