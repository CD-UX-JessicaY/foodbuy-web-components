import { h, Host } from "@stencil/core";
export class FbResizableGroup {
    constructor() {
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
        return (h(Host, { key: '53478d5eec9918ed374c02b6eface8983c1d5cc2' }, h("div", { key: 'b3a184254ba6e041be522c34a37436cff55182c8', ref: el => this.containerEl = el, class: {
                'fb-resizable-group': true,
                'horizontal': this.isH,
                'vertical': !this.isH,
            }, role: "group" }, h("div", { key: 'b09fb58e803d3ce9be49e3b2f197a080459c3390', class: "fb-panel fb-panel--start", style: { [this.isH ? 'width' : 'height']: `${this.startSize}%` } }, h("slot", { key: 'dbbe21939040309bd8787168a5c9381a116903f9', name: "start" })), h("div", { key: '40af3ae332f34b4dc2ca7f939605ff75d4053835', class: { 'fb-handle': true, 'fb-handle--with-grip': this.withHandle }, role: "separator", "aria-orientation": this.isH ? 'vertical' : 'horizontal', "aria-valuenow": Math.round(this.startSize), "aria-valuemin": this.minSize, "aria-valuemax": 100 - this.minSize, "aria-label": handleLabel, tabIndex: 0, onMouseDown: this.beginDrag, onTouchStart: this.beginDrag, onKeyDown: this.handleKeyDown }, this.withHandle && (h("div", { key: 'fe5a85668e47956e73867f78ca835cfa751dca0f', class: "fb-grip", "aria-hidden": "true" }, this.isH ? (
        /* vertical grip dots */
        h("svg", { width: "6", height: "22", viewBox: "0 0 6 22", fill: "none" }, [0, 4].map(x => [1, 5, 9, 13, 17, 21].map(y => h("circle", { key: `${x}-${y}`, cx: x + 1, cy: y, r: "1", fill: "currentColor" }))))) : (
        /* horizontal grip dots */
        h("svg", { width: "22", height: "6", viewBox: "0 0 22 6", fill: "none" }, [0, 4].map(y => [1, 5, 9, 13, 17, 21].map(x => h("circle", { key: `${x}-${y}`, cx: x, cy: y + 1, r: "1", fill: "currentColor" })))))))), h("div", { key: 'bf2dc345042720f3d822d7519f0a0a9ea77e6b5d', class: "fb-panel fb-panel--end", style: { [this.isH ? 'width' : 'height']: `${endSize}%` } }, h("slot", { key: '01694da2955043307f220663ea85ebc7839a780a', name: "end" })))));
    }
    static get is() { return "fb-resizable-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-resizable-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-resizable-group.css"]
        };
    }
    static get properties() {
        return {
            "orientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ResizableOrientation",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {
                        "ResizableOrientation": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-resizable-group/fb-resizable-group.tsx",
                            "id": "src/components/fb-resizable-group/fb-resizable-group.tsx::ResizableOrientation"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Layout direction of the two panels"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "orientation",
                "defaultValue": "'horizontal'"
            },
            "defaultSize": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Initial size of the \"start\" panel as a percentage of the container (0\u2013100).\nThe \"end\" panel takes the remainder."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "default-size",
                "defaultValue": "50"
            },
            "minSize": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Minimum size either panel may reach, as a percentage (0\u2013100).\nPrevents panels from collapsing completely."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "min-size",
                "defaultValue": "10"
            },
            "withHandle": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Show a dot-grid grip indicator on the resize handle"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "with-handle",
                "defaultValue": "false"
            },
            "label": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Accessible label read by screen readers for the resize handle"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "''"
            }
        };
    }
    static get states() {
        return {
            "startSize": {}
        };
    }
    static get events() {
        return [{
                "method": "fbResize",
                "name": "fbResize",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires whenever the start panel size changes (value = new percentage)"
                },
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "defaultSize",
                "methodName": "onDefaultSizeChange"
            }];
    }
}
