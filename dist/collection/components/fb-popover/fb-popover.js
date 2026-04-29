import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbPopover {
    constructor() {
        this.heading = '';
        this.placement = 'bottom';
        this.open = false;
        this._open = false;
        this.triggerEl = null;
        this.handleKeyDown = (e) => {
            var _a, _b;
            if (e.key === 'Escape') {
                e.preventDefault();
                this.closePopover();
                return;
            }
            if (e.key === 'Tab') {
                const focusable = this.getFocusableElements();
                if (focusable.length === 0)
                    return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first || ((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement) === first) {
                        e.preventDefault();
                        last.focus();
                    }
                }
                else {
                    if (document.activeElement === last || ((_b = this.el.shadowRoot) === null || _b === void 0 ? void 0 : _b.activeElement) === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };
    }
    connectedCallback() {
        idCounter++;
        this.triggerId = `fb-popover-trigger-${idCounter}`;
        this.popoverId = `fb-popover-content-${idCounter}`;
    }
    onOpenChange(val) {
        this._open = val;
    }
    onDocumentClick(e) {
        if (this._open && !this.el.contains(e.target))
            this.closePopover();
    }
    toggle() {
        this._open ? this.closePopover() : this.openPopover();
    }
    openPopover() {
        var _a, _b;
        this.triggerEl = (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.triggerId}`)) !== null && _b !== void 0 ? _b : null;
        this._open = true;
        this.fbOpen.emit();
        requestAnimationFrame(() => {
            var _a, _b;
            (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-popover__close')) === null || _b === void 0 ? void 0 : _b.focus();
        });
    }
    closePopover() {
        var _a;
        this._open = false;
        this.fbClose.emit();
        (_a = this.triggerEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    getFocusableElements() {
        var _a, _b;
        return Array.from((_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')) !== null && _b !== void 0 ? _b : []);
    }
    render() {
        return (h(Host, { key: '45c68f88cf3002f68ab2dbb361106cedd2ffcde3' }, h("span", { key: '52868074522371dcdc1fca800f434ab512b2e9de', class: "fb-popover-anchor" }, h("button", { key: 'cd9b96d8bfb7e932068daa02e954259d1995962a', id: this.triggerId, type: "button", "aria-haspopup": "dialog", "aria-expanded": this._open ? 'true' : 'false', "aria-controls": this._open ? this.popoverId : null, class: "fb-popover-trigger", onClick: () => this.toggle() }, h("slot", { key: '9dc468a1b2d2d312ac18d2064e86d1f24901ad19', name: "trigger" }, "Open")), this._open && (h("div", { key: '3676d972a5fd363372afa109eb111debb02b4f3a', id: this.popoverId, role: "dialog", "aria-modal": "false", "aria-label": this.heading || 'Popover', class: `fb-popover fb-popover--${this.placement}`, onKeyDown: this.handleKeyDown }, h("div", { key: 'd2ad8434d99247349a6a65a4c033106aa969805d', class: "fb-popover__header" }, this.heading && h("span", { key: 'c2bb41374c9cd0f49571b3812219a6dca57d50d1', class: "fb-popover__heading" }, this.heading), h("button", { key: 'eca2f693c6e2a58a7afb16f92e7a4a9a1b212c0d', type: "button", class: "fb-popover__close", "aria-label": "Close popover", onClick: () => this.closePopover() }, h("svg", { key: '94a56e8bb476c1d6b86156308cc1c35273334507', "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '331cb45b78051635700de59732773d11514547c1', d: "M18 6L6 18M6 6l12 12" })))), h("div", { key: 'ee122cd14052e336e4c9bf9805bccbb205a6f8d5', class: "fb-popover__body" }, h("slot", { key: 'b2c2ccec0a9ef5f41c5726641871d34a54050617' })))))));
    }
    static get is() { return "fb-popover"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-popover.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-popover.css"]
        };
    }
    static get properties() {
        return {
            "heading": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "heading",
                "defaultValue": "''"
            },
            "placement": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'top' | 'bottom' | 'left' | 'right'",
                    "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "placement",
                "defaultValue": "'bottom'"
            },
            "open": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "open",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_open": {}
        };
    }
    static get events() {
        return [{
                "method": "fbOpen",
                "name": "fbOpen",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "fbClose",
                "name": "fbClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "open",
                "methodName": "onOpenChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onDocumentClick",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
