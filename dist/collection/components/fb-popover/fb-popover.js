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
        return (h(Host, { key: '61b1f2f135faa0d35e6920d8f1f9bea49fec9429' }, h("span", { key: '53db6764f86a0d6dce68492323623b6bf41bed01', class: "fb-popover-anchor" }, h("button", { key: 'b61b493df47219a6b553306520ad4726cf9f41d9', id: this.triggerId, type: "button", "aria-haspopup": "dialog", "aria-expanded": this._open ? 'true' : 'false', "aria-controls": this._open ? this.popoverId : null, class: "fb-popover-trigger", onClick: () => this.toggle() }, h("slot", { key: 'b5512b9fdfe722bed2e67c7d635ab083ecbdfae3', name: "trigger" }, "Open")), this._open && (h("div", { key: 'f5ecf98be46431042d45d4277bbb73dec4a61939', id: this.popoverId, role: "dialog", "aria-modal": "false", "aria-label": this.heading || 'Popover', class: `fb-popover fb-popover--${this.placement}`, onKeyDown: this.handleKeyDown }, h("div", { key: '32e58396d0760c40f89a682d3ca19092101958ef', class: "fb-popover__header" }, this.heading && h("span", { key: '2b89b37cefaa976594efb14e594e28f793e01ae4', class: "fb-popover__heading" }, this.heading), h("button", { key: 'd8726e06548fa2ce61d65005950541f7d9255d33', type: "button", class: "fb-popover__close", "aria-label": "Close popover", onClick: () => this.closePopover() }, h("svg", { key: 'c4f375d18cca38fc40eadedb97a2b7e48ad4bab8', "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: 'f91981a1572b79bc58e6b128fbd74395f68a66d7', d: "M18 6L6 18M6 6l12 12" })))), h("div", { key: '194123cda5ce18b4359c78aec47575ee70befce8', class: "fb-popover__body" }, h("slot", { key: '6b3bfd0f259ec2af15508acbef8bd729b827c371' })))))));
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
