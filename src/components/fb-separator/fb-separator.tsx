import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'fb-separator',
  styleUrl: 'fb-separator.css',
  shadow: true,
})
export class FbSeparator {
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';
  /** Provide a label to make this separator a section divider with a title. */
  @Prop() label: string = '';
  /** When true the separator is purely decorative and hidden from AT. */
  @Prop() decorative: boolean = true;

  render() {
    if (this.label) {
      return (
        <Host>
          <div role="separator" aria-label={this.label} class={`fb-separator fb-separator--${this.orientation} fb-separator--labeled`}>
            <span class="fb-separator__label">{this.label}</span>
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <hr
          class={`fb-separator fb-separator--${this.orientation}`}
          aria-hidden={this.decorative ? 'true' : null}
          role={this.decorative ? null : 'separator'}
        />
      </Host>
    );
  }
}
