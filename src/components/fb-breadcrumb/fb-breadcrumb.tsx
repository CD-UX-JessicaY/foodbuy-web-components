import { Component, Prop, h, Host } from '@stencil/core';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  tag: 'fb-breadcrumb',
  styleUrl: 'fb-breadcrumb.css',
  shadow: true,
})
export class FbBreadcrumb {
  @Prop() items: BreadcrumbItem[] | string = '[]';
  @Prop() label: string = 'Breadcrumb';

  private get parsedItems(): BreadcrumbItem[] {
    if (typeof this.items === 'string') {
      try { return JSON.parse(this.items); } catch { return []; }
    }
    return this.items;
  }

  render() {
    const items = this.parsedItems;

    return (
      <Host>
        {/*
          <nav aria-label> identifies this as a landmark region.
          <ol> communicates the ordered sequence to screen readers.
          The current page gets aria-current="page".
          Separator characters are aria-hidden.
        */}
        <nav aria-label={this.label} class="fb-breadcrumb">
          <ol class="breadcrumb-list">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={index} class="breadcrumb-item">
                  {isLast ? (
                    <span aria-current="page" class="breadcrumb-current">{item.label}</span>
                  ) : (
                    <a href={item.href || '#'} class="breadcrumb-link">{item.label}</a>
                  )}
                  {!isLast && (
                    <span class="breadcrumb-separator" aria-hidden="true">/</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Host>
    );
  }
}
