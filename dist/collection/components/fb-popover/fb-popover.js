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
        return (h(Host, { key: '3cc987e6b6e85837d2bd0539e6dc99a328b4b971' }, h("span", { key: 'ecf3872eac4f2be80af5017ca64978797306f907', class: "fb-popover-anchor" }, h("button", { key: 'b89088b6999648ad100b9c4026b66f319d9e6c0e', id: this.triggerId, type: "button", "aria-haspopup": "dialog", "aria-expanded": this._open ? 'true' : 'false', "aria-controls": this._open ? this.popoverId : null, class: "fb-popover-trigger", onClick: () => this.toggle() }, h("slot", { key: '6c3f47a0b585b7bf1fe06baf5ea11e7d9f1942b5', name: "trigger" }, "Open")), this._open && (h("div", { key: '8df0016c661e15a6242d19d83d93302a69a15ba3', id: this.popoverId, role: "dialog", "aria-modal": "false", "aria-label": this.heading || 'Popover', class: `fb-popover fb-popover--${this.placement}`, onKeyDown: this.handleKeyDown }, h("div", { key: '7b5be1cc295be06b4159e4e33ffb56b05ef1d532', class: "fb-popover__header" }, this.heading && h("span", { key: 'd79d7673d8d61fb2008d61c90a3e27b10c64f427', class: "fb-popover__heading" }, this.heading), h("button", { key: '6213de7c8cb607238dba880eb0e1b9cfcb9cdc16', type: "button", class: "fb-popover__close", "aria-label": "Close popover", onClick: () => this.closePopover() }, h("svg", { key: 'f45605df8de24ac837f14e46e52fadc1b513c29b', "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '3e1170cfbab28ede33b8d62fcf8ed99b7b979f0c', d: "M18 6L6 18M6 6l12 12" })))), h("div", { key: 'f9c01d125b70a9188af521a2f50ee20451aca7f4', class: "fb-popover__body" }, h("slot", { key: '77bac0d6e0f4361a68bc16fd6769aee019c90fc2' })))))));
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
