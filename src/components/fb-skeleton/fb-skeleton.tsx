import { Component, Prop, h, Host } from '@stencil/core';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

@Component({
  tag: 'fb-skeleton',
  styleUrl: 'fb-skeleton.css',
  shadow: true,
})
export class FbSkeleton {
  /** Shape of the skeleton placeholder */
  @Prop() variant: SkeletonVariant = 'text';

  /** Width — any CSS value e.g. "200px", "100%", "12rem" */
  @Prop() width: string = '100%';

  /** Height — any CSS value */
  @Prop() height: string;

  render() {
    const style = {
      width: this.width,
      height: this.height || (this.variant === 'text' ? '1em' : this.variant === 'circle' ? this.width : '80px'),
    };

    return (
      <Host>
        {/*
          aria-hidden: skeletons are purely decorative placeholders.
          The loading state is communicated by the parent container's aria-busy="true".
          See fb-skeleton usage note: wrap skeleton groups in <div aria-busy="true" aria-label="Loading content">
        */}
        <span
          aria-hidden="true"
          class={{ 'fb-skeleton': true, [`variant-${this.variant}`]: true }}
          style={style}
        />
      </Host>
    );
  }
}
