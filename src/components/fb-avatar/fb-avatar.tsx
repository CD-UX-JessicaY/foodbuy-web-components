import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'fb-avatar',
  styleUrl: 'fb-avatar.css',
  shadow: true,
})
export class FbAvatar {
  @Prop() src: string = '';
  @Prop() alt: string = '';
  @Prop() initials: string = '';
  @Prop() size: 'xs' | 'sm' | 'default' | 'lg' | 'xl' = 'default';
  @Prop() shape: 'circle' | 'square' = 'circle';
  @Prop() status: 'none' | 'online' | 'offline' | 'busy' = 'none';

  private getStatusLabel(): string {
    const map: Record<string, string> = { online: 'Online', offline: 'Offline', busy: 'Busy' };
    return map[this.status] ?? '';
  }

  render() {
    const classes = {
      'fb-avatar': true,
      [`fb-avatar--${this.size}`]: true,
      [`fb-avatar--${this.shape}`]: true,
    };

    const content = this.src
      ? <img src={this.src} alt={this.alt} class="fb-avatar__img" />
      : (
        <span
          role="img"
          aria-label={this.alt || this.initials || 'Avatar'}
          class="fb-avatar__initials"
        >
          {this.initials}
        </span>
      );

    return (
      <Host>
        <span class={classes}>
          {content}
          {this.status !== 'none' && (
            <span
              class={`fb-avatar__status fb-avatar__status--${this.status}`}
              aria-label={this.getStatusLabel()}
              role="img"
            />
          )}
        </span>
      </Host>
    );
  }
}
