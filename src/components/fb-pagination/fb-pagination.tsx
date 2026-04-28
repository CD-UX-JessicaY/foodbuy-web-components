import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'fb-pagination',
  styleUrl: 'fb-pagination.css',
  shadow: true,
})
export class FbPagination {
  @Prop({ mutable: true }) currentPage: number = 1;
  @Prop() totalPages: number = 1;
  @Prop() label: string = 'Pagination';

  @Event() fbPageChange: EventEmitter<number>;

  private go(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.fbPageChange.emit(page);
  }

  private getPages(): (number | '...')[] {
    const total = this.totalPages;
    const cur   = this.currentPage;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | '...')[] = [1];
    if (cur > 3)           pages.push('...');
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
    if (cur < total - 2)   pages.push('...');
    pages.push(total);
    return pages;
  }

  render() {
    const pages   = this.getPages();
    const isFirst = this.currentPage === 1;
    const isLast  = this.currentPage === this.totalPages;

    return (
      <Host>
        {/*
          <nav aria-label> makes this a landmark so screen reader users can
          jump straight to pagination.
          Each page button has a descriptive aria-label.
          The current page has aria-current="page".
          Prev/next arrows are labelled — not relying on icon alone.
        */}
        <nav aria-label={this.label} class="fb-pagination">
          <button
            type="button"
            class="page-btn nav-btn"
            aria-label="Go to previous page"
            disabled={isFirst}
            aria-disabled={isFirst ? 'true' : null}
            onClick={() => this.go(this.currentPage - 1)}
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {pages.map((page, i) =>
            page === '...'
              ? <span key={`ellipsis-${i}`} class="ellipsis" aria-hidden="true">…</span>
              : (
                <button
                  key={page}
                  type="button"
                  class={{ 'page-btn': true, 'active': page === this.currentPage }}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === this.currentPage ? 'page' : null}
                  onClick={() => this.go(page as number)}
                >
                  {page}
                </button>
              )
          )}

          <button
            type="button"
            class="page-btn nav-btn"
            aria-label="Go to next page"
            disabled={isLast}
            aria-disabled={isLast ? 'true' : null}
            onClick={() => this.go(this.currentPage + 1)}
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </nav>
      </Host>
    );
  }
}
