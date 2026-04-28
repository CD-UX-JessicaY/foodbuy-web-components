import { Component, Prop, State, Event, EventEmitter, Element, Watch, h, Host } from '@stencil/core';

export type ResizableOrientation = 'horizontal' | 'vertical';

@Component({
  tag: 'fb-resizable-group',
  styleUrl: 'fb-resizable-group.css',
  shadow: true,
})
export class FbResizableGroup {
  @Element() el!: HTMLElement;

  /** Layout direction of the two panels */
  @Prop() orientation: ResizableOrientation = 'horizontal';
  /**
   * Initial size of the "start" panel as a percentage of the container (0–100).
   * The "end" panel takes the remainder.
   */
  @Prop() defaultSize: number = 50;
  /**
   * Minimum size either panel may reach, as a percentage (0–100).
   * Prevents panels from collapsing completely.
   */
  @Prop() minSize: number = 10;
  /** Show a dot-grid grip indicator on the resize handle */
  @Prop() withHandle: boolean = false;
  /** Accessible label read by screen readers for the resize handle */
  @Prop() label: string = '';

  /** Fires whenever the start panel size changes (value = new percentage) */
  @Event() fbResize: EventEmitter<number>;

  @State() startSize: number = 50;

  /** Currently active drag session */
  private drag: { startPos: number; startSize: number } | null = null;
  private containerEl!: HTMLDivElement;

  connectedCallback() {
    this.startSize = Math.min(
      100 - this.minSize,
      Math.max(this.minSize, this.defaultSize),
    );
  }

  @Watch('defaultSize')
  onDefaultSizeChange(v: number) {
    this.startSize = Math.min(100 - this.minSize, Math.max(this.minSize, v));
  }

  // ── Drag handling ─────────────────────────────────────────────────

  private beginDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const clientPos = e instanceof MouseEvent ? (this.isH ? e.clientX : e.clientY)
                                              : (this.isH ? (e as TouchEvent).touches[0].clientX : (e as TouchEvent).touches[0].clientY);
    this.drag = { startPos: clientPos, startSize: this.startSize };
    window.addEventListener('mousemove', this.onDragMove);
    window.addEventListener('mouseup',   this.onDragEnd);
    window.addEventListener('touchmove', this.onDragMove, { passive: false });
    window.addEventListener('touchend',  this.onDragEnd);
  };

  private onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!this.drag || !this.containerEl) return;
    if (e instanceof TouchEvent) e.preventDefault();

    const rect      = this.containerEl.getBoundingClientRect();
    const total     = this.isH ? rect.width : rect.height;
    const clientPos = e instanceof MouseEvent ? (this.isH ? e.clientX : e.clientY)
                                              : (this.isH ? (e as TouchEvent).touches[0].clientX : (e as TouchEvent).touches[0].clientY);
    const delta     = (clientPos - this.drag.startPos) / total * 100;
    this.applySize(this.drag.startSize + delta);
  };

  private onDragEnd = () => {
    this.drag = null;
    window.removeEventListener('mousemove', this.onDragMove);
    window.removeEventListener('mouseup',   this.onDragEnd);
    window.removeEventListener('touchmove', this.onDragMove);
    window.removeEventListener('touchend',  this.onDragEnd);
  };

  private applySize(newSize: number) {
    const clamped = Math.min(100 - this.minSize, Math.max(this.minSize, newSize));
    this.startSize = clamped;
    this.fbResize.emit(clamped);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const step = 5;
    const fwd  = this.isH ? 'ArrowRight' : 'ArrowDown';
    const back = this.isH ? 'ArrowLeft'  : 'ArrowUp';
    if (e.key === fwd)  { e.preventDefault(); this.applySize(this.startSize + step); }
    if (e.key === back) { e.preventDefault(); this.applySize(this.startSize - step); }
    if (e.key === 'Home') { e.preventDefault(); this.applySize(this.minSize); }
    if (e.key === 'End')  { e.preventDefault(); this.applySize(100 - this.minSize); }
  };

  private get isH() { return this.orientation === 'horizontal'; }

  // ── Render ────────────────────────────────────────────────────────

  render() {
    const endSize   = 100 - this.startSize;
    const handleLabel = this.label || `Resize panels — use arrow keys to adjust`;

    return (
      <Host>
        <div
          ref={el => this.containerEl = el as HTMLDivElement}
          class={{
            'fb-resizable-group': true,
            'horizontal': this.isH,
            'vertical': !this.isH,
          }}
          role="group"
        >
          {/* Start panel */}
          <div
            class="fb-panel fb-panel--start"
            style={{ [this.isH ? 'width' : 'height']: `${this.startSize}%` }}
          >
            <slot name="start" />
          </div>

          {/*
            Resize handle.
            role="separator" + aria-orientation communicates to screen readers.
            aria-valuenow / aria-valuemin / aria-valuemax expose the current size.
            aria-label explains how to interact.
          */}
          <div
            class={{ 'fb-handle': true, 'fb-handle--with-grip': this.withHandle }}
            role="separator"
            aria-orientation={this.isH ? 'vertical' : 'horizontal'}
            aria-valuenow={Math.round(this.startSize)}
            aria-valuemin={this.minSize}
            aria-valuemax={100 - this.minSize}
            aria-label={handleLabel}
            tabIndex={0}
            onMouseDown={this.beginDrag}
            onTouchStart={this.beginDrag}
            onKeyDown={this.handleKeyDown}
          >
            {this.withHandle && (
              <div class="fb-grip" aria-hidden="true">
                {this.isH ? (
                  /* vertical grip dots */
                  <svg width="6" height="22" viewBox="0 0 6 22" fill="none">
                    {[0, 4].map(x => [1, 5, 9, 13, 17, 21].map(y =>
                      <circle key={`${x}-${y}`} cx={x + 1} cy={y} r="1" fill="currentColor"/>
                    ))}
                  </svg>
                ) : (
                  /* horizontal grip dots */
                  <svg width="22" height="6" viewBox="0 0 22 6" fill="none">
                    {[0, 4].map(y => [1, 5, 9, 13, 17, 21].map(x =>
                      <circle key={`${x}-${y}`} cx={x} cy={y + 1} r="1" fill="currentColor"/>
                    ))}
                  </svg>
                )}
              </div>
            )}
          </div>

          {/* End panel */}
          <div
            class="fb-panel fb-panel--end"
            style={{ [this.isH ? 'width' : 'height']: `${endSize}%` }}
          >
            <slot name="end" />
          </div>
        </div>
      </Host>
    );
  }
}
