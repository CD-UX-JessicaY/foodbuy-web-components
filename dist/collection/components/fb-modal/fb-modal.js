import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbModal {
    constructor() {
        this.open = false;
        this.size = 'default';
        this.heading = '';
        this.description = '';
        this.showFooter = true;
        this.closeOnOverlay = true;
        this.confirmLabel = 'Confirm';
        this.cancelLabel = 'Cancel';
        this.triggerElement = null;
        this.handleKeyDown = (e) => {
            var _a, _b, _c;
            if (!this.open)
                return;
            if (e.key === 'Escape') {
                e.preventDefault();
                this.close();
                return;
            }
            // Focus trap: keep Tab/Shift+Tab cycling within the modal
            if (e.key === 'Tab') {
                const modal = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-modal');
                if (!modal)
                    return;
                const focusable = this.getFocusableElements(modal);
                if (focusable.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first || ((_b = this.el.shadowRoot) === null || _b === void 0 ? void 0 : _b.activeElement) === first) {
                        e.preventDefault();
                        last.focus();
                    }
                }
                else {
                    if (document.activeElement === last || ((_c = this.el.shadowRoot) === null || _c === void 0 ? void 0 : _c.activeElement) === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };
    }
    connectedCallback() {
        idCounter++;
        this.titleId = `fb-modal-title-${idCounter}`;
        this.descId = `fb-modal-desc-${idCounter}`;
    }
    onOpenChange(isOpen) {
        var _a;
        if (isOpen) {
            // Store the element that triggered the modal so we can return focus later
            this.triggerElement = document.activeElement;
            // Move focus into the modal after the next render
            requestAnimationFrame(() => this.focusFirstElement());
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
            // Return focus to the trigger element
            (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.focus();
            this.triggerElement = null;
        }
    }
    focusFirstElement() {
        var _a, _b;
        const modal = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-modal');
        if (!modal)
            return;
        const focusable = this.getFocusableElements(modal);
        (_b = focusable[0]) === null || _b === void 0 ? void 0 : _b.focus();
    }
    getFocusableElements(container) {
        return Array.from(container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => !el.closest('[hidden]'));
    }
    close() {
        this.fbClose.emit();
    }
    render() {
        if (!this.open)
            return h(Host, null);
        return (h(Host, { onKeyDown: this.handleKeyDown }, h("div", { class: "fb-overlay", "aria-hidden": "true", onClick: () => this.closeOnOverlay && this.close() }), h("div", { class: { 'fb-modal': true, [`size-${this.size}`]: true }, role: "dialog", "aria-modal": "true", "aria-labelledby": this.heading ? this.titleId : null, "aria-describedby": this.description ? this.descId : null, onClick: (e) => e.stopPropagation() }, h("div", { class: "modal-header" }, h("div", { class: "modal-heading-group" }, this.heading && (h("h2", { id: this.titleId, class: "modal-title" }, this.heading)), this.description && (h("p", { id: this.descId, class: "modal-description" }, this.description))), h("button", { type: "button", class: "close-btn", "aria-label": "Close dialog", onClick: () => this.close() }, h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, h("path", { d: "M3 3l10 10M13 3L3 13", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })))), h("div", { class: "modal-body" }, h("slot", null)), this.showFooter && (h("div", { class: "modal-footer" }, h("button", { type: "button", class: "btn-cancel", onClick: () => this.close() }, this.cancelLabel), h("button", { type: "button", class: "btn-confirm", onClick: () => this.fbConfirm.emit() }, this.confirmLabel))))));
    }
    static get is() { return "fb-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-modal.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-modal.css"]
        };
    }
    static get properties() {
        return {
            "open": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "open",
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ModalSize",
                    "resolved": "\"default\" | \"fullscreen\" | \"lg\" | \"sm\"",
                    "references": {
                        "ModalSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-modal/fb-modal.tsx",
                            "id": "src/components/fb-modal/fb-modal.tsx::ModalSize"
                        }
                    }
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
            "description": {
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
                "attribute": "description",
                "defaultValue": "''"
            },
            "showFooter": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "show-footer",
                "defaultValue": "true"
            },
            "closeOnOverlay": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "close-on-overlay",
                "defaultValue": "true"
            },
            "confirmLabel": {
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
                "attribute": "confirm-label",
                "defaultValue": "'Confirm'"
            },
            "cancelLabel": {
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
                "attribute": "cancel-label",
                "defaultValue": "'Cancel'"
            }
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
            }, {
                "method": "fbConfirm",
                "name": "fbConfirm",
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
}
