import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbSideSheet {
    constructor() {
        this.open = false;
        this.heading = '';
        this.side = 'right';
        this.size = 'default';
        this._open = false;
        this.triggerElement = null;
    }
    connectedCallback() {
        idCounter++;
        this.sheetId = `fb-side-sheet-${idCounter}`;
        this.headingId = `fb-side-sheet-heading-${idCounter}`;
    }
    onOpenChange(val) {
        var _a, _b;
        if (val && !this._open) {
            this.triggerElement = document.activeElement;
            this._open = true;
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                var _a, _b;
                (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-side-sheet__close')) === null || _b === void 0 ? void 0 : _b.focus();
            });
        }
        else if (!val && this._open) {
            this._open = false;
            document.body.style.overflow = '';
            (_b = (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    }
    onWindowKeydown(e) {
        if (!this._open)
            return;
        if (e.key === 'Escape') {
            e.preventDefault();
            this.close();
        }
        if (e.key === 'Tab') {
            this.trapFocus(e);
        }
    }
    trapFocus(e) {
        var _a, _b, _c;
        const focusable = Array.from((_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')) !== null && _b !== void 0 ? _b : []);
        if (focusable.length === 0)
            return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = (_c = this.el.shadowRoot) === null || _c === void 0 ? void 0 : _c.activeElement;
        if (e.shiftKey) {
            if (active === first) {
                e.preventDefault();
                last.focus();
            }
        }
        else {
            if (active === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }
    close() {
        var _a, _b;
        this.open = false;
        this.fbClose.emit();
        this._open = false;
        document.body.style.overflow = '';
        (_b = (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    render() {
        if (!this._open && !this.open)
            return h(Host, null);
        return (h(Host, null, h("div", { class: "fb-side-sheet__overlay", "aria-hidden": "true", onClick: () => this.close() }), h("div", { id: this.sheetId, role: "dialog", "aria-modal": "true", "aria-labelledby": this.headingId, class: {
                'fb-side-sheet': true,
                [`fb-side-sheet--${this.side}`]: true,
                [`fb-side-sheet--${this.size}`]: true,
                'fb-side-sheet--open': this._open || this.open,
            } }, h("div", { class: "fb-side-sheet__header" }, this.heading
            ? h("h2", { id: this.headingId, class: "fb-side-sheet__heading" }, this.heading)
            : h("span", { id: this.headingId }, h("slot", { name: "heading" })), h("button", { type: "button", class: "fb-side-sheet__close", "aria-label": "Close panel", onClick: () => this.close() }, h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M18 6L6 18M6 6l12 12" })))), h("div", { class: "fb-side-sheet__body" }, h("slot", null)), h("div", { class: "fb-side-sheet__footer" }, h("slot", { name: "footer" })))));
    }
    static get is() { return "fb-side-sheet"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-side-sheet.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-side-sheet.css"]
        };
    }
    static get properties() {
        return {
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
            },
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
            "side": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'left' | 'right'",
                    "resolved": "\"left\" | \"right\"",
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
                "attribute": "side",
                "defaultValue": "'right'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'sm' | 'default' | 'lg'",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
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
                "attribute": "size",
                "defaultValue": "'default'"
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
                "name": "keydown",
                "method": "onWindowKeydown",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
