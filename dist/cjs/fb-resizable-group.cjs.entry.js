'use strict';

var index = require('./index-DHbX5Dio.js');

const fbResizableGroupCss = () => `:host{display:block;width:100%;height:100%}.fb-resizable-group{display:flex;width:100%;height:100%;overflow:hidden;border-radius:var(--radius-sm);border:var(--border-standard) solid var(--color-neutral-200);box-sizing:border-box}.fb-resizable-group.horizontal{flex-direction:row}.fb-resizable-group.vertical{flex-direction:column}.fb-panel{overflow:auto;flex-shrink:0;box-sizing:border-box}.horizontal .fb-panel{height:100%}.vertical .fb-panel{width:100%}.fb-handle{flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--color-neutral-100);transition:background 0.15s;position:relative;z-index:1;outline:none;cursor:col-resize}.horizontal .fb-handle{width:4px;height:100%;cursor:col-resize}.vertical .fb-handle{height:4px;width:100%;cursor:row-resize}.horizontal .fb-handle--with-grip{width:10px}.vertical .fb-handle--with-grip{height:10px}.fb-handle:hover{background:var(--color-primary-100)}.fb-handle:focus-visible{background:var(--color-primary-200);outline:var(--focus-width) solid var(--focus-color);outline-offset:-2px}.fb-grip{display:flex;align-items:center;justify-content:center;background:var(--color-neutral-300);border-radius:var(--radius-max);color:var(--color-neutral-600);pointer-events:none}.horizontal .fb-grip{width:8px;height:32px}.vertical .fb-grip{width:32px;height:8px}.fb-handle:hover .fb-grip{background:var(--color-primary-300);color:var(--color-primary-700)}`;

const FbResizableGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbResize = index.createEvent(this, "fbResize");
        /** Layout direction of the two panels */
        this.orientation = 'horizontal';
        /**
         * Initial size of the "start" panel as a percentage of the container (0–100).
         * The "end" panel takes the remainder.
         */
        this.defaultSize = 50;
        /**
         * Minimum size either panel may reach, as a percentage (0–100).
         * Prevents panels from collapsing completely.
         */
        this.minSize = 10;
        /** Show a dot-grid grip indicator on the resize handle */
        this.withHandle = false;
        /** Accessible label read by screen readers for the resize handle */
        this.label = '';
        this.startSize = 50;
        /** Currently active drag session */
        this.drag = null;
        // ── Drag handling ─────────────────────────────────────────────────
        this.beginDrag = (e) => {
            e.preventDefault();
            const clientPos = e instanceof MouseEvent ? (this.isH ? e.clientX : e.clientY)
                : (this.isH ? e.touches[0].clientX : e.touches[0].clientY);
            this.drag = { startPos: clientPos, startSize: this.startSize };
            window.addEventListener('mousemove', this.onDragMove);
            window.addEventListener('mouseup', this.onDragEnd);
            window.addEventListener('touchmove', this.onDragMove, { passive: false });
            window.addEventListener('touchend', this.onDragEnd);
        };
        this.onDragMove = (e) => {
            if (!this.drag || !this.containerEl)
                return;
            if (e instanceof TouchEvent)
                e.preventDefault();
            const rect = this.containerEl.getBoundingClientRect();
            const total = this.isH ? rect.width : rect.height;
            const clientPos = e instanceof MouseEvent ? (this.isH ? e.clientX : e.clientY)
                : (this.isH ? e.touches[0].clientX : e.touches[0].clientY);
            const delta = (clientPos - this.drag.startPos) / total * 100;
            this.applySize(this.drag.startSize + delta);
        };
        this.onDragEnd = () => {
            this.drag = null;
            window.removeEventListener('mousemove', this.onDragMove);
            window.removeEventListener('mouseup', this.onDragEnd);
            window.removeEventListener('touchmove', this.onDragMove);
            window.removeEventListener('touchend', this.onDragEnd);
        };
        this.handleKeyDown = (e) => {
            const step = 5;
            const fwd = this.isH ? 'ArrowRight' : 'ArrowDown';
            const back = this.isH ? 'ArrowLeft' : 'ArrowUp';
            if (e.key === fwd) {
                e.preventDefault();
                this.applySize(this.startSize + step);
            }
            if (e.key === back) {
                e.preventDefault();
                this.applySize(this.startSize - step);
            }
            if (e.key === 'Home') {
                e.preventDefault();
                this.applySize(this.minSize);
            }
            if (e.key === 'End') {
                e.preventDefault();
                this.applySize(100 - this.minSize);
            }
        };
    }
    connectedCallback() {
        this.startSize = Math.min(100 - this.minSize, Math.max(this.minSize, this.defaultSize));
    }
    onDefaultSizeChange(v) {
        this.startSize = Math.min(100 - this.minSize, Math.max(this.minSize, v));
    }
    applySize(newSize) {
        const clamped = Math.min(100 - this.minSize, Math.max(this.minSize, newSize));
        this.startSize = clamped;
        this.fbResize.emit(clamped);
    }
    get isH() { return this.orientation === 'horizontal'; }
    // ── Render ────────────────────────────────────────────────────────
    render() {
        const endSize = 100 - this.startSize;
        const handleLabel = this.label || `Resize panels — use arrow keys to adjust`;
        return (index.h(index.Host, { key: 'dda0bab0e30b23c8ca70943997c006bc3ac81d1e' }, index.h("div", { key: 'bc3b0ff41d5c7cb59f56becfd950473f3b0a6188', ref: el => this.containerEl = el, class: {
                'fb-resizable-group': true,
                'horizontal': this.isH,
                'vertical': !this.isH,
            }, role: "group" }, index.h("div", { key: '7d6f66dc3874a2e5a600b11655744c20aa64e1e1', class: "fb-panel fb-panel--start", style: { [this.isH ? 'width' : 'height']: `${this.startSize}%` } }, index.h("slot", { key: '2b50b2d00bda684b80bdbe129f1126f76e9a1c47', name: "start" })), index.h("div", { key: 'adcd3fff616dfa8b37b95b8b8facc9cf014d0c93', class: { 'fb-handle': true, 'fb-handle--with-grip': this.withHandle }, role: "separator", "aria-orientation": this.isH ? 'vertical' : 'horizontal', "aria-valuenow": Math.round(this.startSize), "aria-valuemin": this.minSize, "aria-valuemax": 100 - this.minSize, "aria-label": handleLabel, tabIndex: 0, onMouseDown: this.beginDrag, onTouchStart: this.beginDrag, onKeyDown: this.handleKeyDown }, this.withHandle && (index.h("div", { key: '17cee9ff93c8958ad71efd408455707ff5288691', class: "fb-grip", "aria-hidden": "true" }, this.isH ? (
        /* vertical grip dots */
        index.h("svg", { width: "6", height: "22", viewBox: "0 0 6 22", fill: "none" }, [0, 4].map(x => [1, 5, 9, 13, 17, 21].map(y => index.h("circle", { key: `${x}-${y}`, cx: x + 1, cy: y, r: "1", fill: "currentColor" }))))) : (
        /* horizontal grip dots */
        index.h("svg", { width: "22", height: "6", viewBox: "0 0 22 6", fill: "none" }, [0, 4].map(y => [1, 5, 9, 13, 17, 21].map(x => index.h("circle", { key: `${x}-${y}`, cx: x, cy: y + 1, r: "1", fill: "currentColor" })))))))), index.h("div", { key: 'a99daaf987f0dc1154046071202273ae44a8a985', class: "fb-panel fb-panel--end", style: { [this.isH ? 'width' : 'height']: `${endSize}%` } }, index.h("slot", { key: '5ba5792ba88155ddbf6ac3587470677f9013217a', name: "end" })))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "defaultSize": [{
                "onDefaultSizeChange": 0
            }]
    }; }
};
FbResizableGroup.style = fbResizableGroupCss();

exports.fb_resizable_group = FbResizableGroup;
