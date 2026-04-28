import { Component, Prop, h, Host } from '@stencil/core';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: 'complete' | 'active' | 'pending';
}

@Component({
  tag: 'fb-timeline',
  styleUrl: 'fb-timeline.css',
  shadow: true,
})
export class FbTimeline {
  @Prop() items: TimelineItem[] | string = '[]';
  @Prop() label: string = 'Timeline';
  @Prop() orientation: 'vertical' | 'horizontal' = 'vertical';

  private get parsedItems(): TimelineItem[] {
    if (typeof this.items === 'string') {
      try { return JSON.parse(this.items); } catch { return []; }
    }
    return this.items;
  }

  private statusIcon(status: string) {
    if (status === 'complete') {
      return (
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      );
    }
    if (status === 'active') {
      return <span class="fb-timeline__dot-inner" />;
    }
    return null;
  }

  render() {
    const items = this.parsedItems;

    return (
      <Host>
        <ol
          aria-label={this.label}
          class={`fb-timeline fb-timeline--${this.orientation}`}
        >
          {items.map((item, i) => (
            <li
              key={item.id}
              class={{
                'fb-timeline__item': true,
                [`fb-timeline__item--${item.status ?? 'pending'}`]: true,
                'fb-timeline__item--last': i === items.length - 1,
              }}
            >
              <div class="fb-timeline__indicator" aria-hidden="true">
                <span class={`fb-timeline__dot fb-timeline__dot--${item.status ?? 'pending'}`}>
                  {this.statusIcon(item.status ?? 'pending')}
                </span>
                {i < items.length - 1 && <span class="fb-timeline__line" />}
              </div>
              <div class="fb-timeline__content">
                {item.timestamp && (
                  <time class="fb-timeline__timestamp">{item.timestamp}</time>
                )}
                <p class="fb-timeline__title">{item.title}</p>
                {item.description && (
                  <p class="fb-timeline__description">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Host>
    );
  }
}
