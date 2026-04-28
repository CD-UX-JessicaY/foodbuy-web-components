import { h, Host } from "@stencil/core";
export class FbToast {
    constructor() {
        this.variant = 'info';
        this.message = '';
        this.visible = false;
        /** Auto-dismiss delay in ms. 0 = no auto-dismiss. Minimum recommended: 5000 */
        this.duration = 6000;
        this.animatingOut = false;
        this.dismiss = () => {
            this.animatingOut = true;
            setTimeout(() => {
                this.animatingOut = false;
                this.fbDismiss.emit();
            }, 200);
        };
    }
    onVisibleChange(newVal) {
        if (newVal && this.duration > 0) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.dismiss(), this.duration);
        }
    }
    disconnectedCallback() {
        clearTimeout(this.timer);
    }
    render() {
        if (!this.visible)
            return null;
        return (h(Host, null, h("div", { role: "status", "aria-live": "polite", "aria-atomic": "true", class: {
                'fb-toast': true,
                [`variant-${this.variant}`]: true,
                'animating-out': this.animatingOut,
            } }, h("span", { class: "toast-icon", "aria-hidden": "true" }, this.variant === 'info' && h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M9 8v5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("circle", { cx: "9", cy: "5.5", r: ".75", fill: "currentColor" })), this.variant === 'success' && h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M5.5 9l2.5 2.5 4.5-5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })), this.variant === 'warning' && h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, h("path", { d: "M9 2L16.5 15H1.5L9 2Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), h("path", { d: "M9 7v4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("circle", { cx: "9", cy: "12.5", r: ".75", fill: "currentColor" })), this.variant === 'danger' && h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M6 6l6 6M12 6l-6 6", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))), h("span", { class: "toast-message" }, this.message), h("button", { type: "button", class: "dismiss-btn", "aria-label": "Dismiss notification", onClick: this.dismiss }, h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 16 16", fill: "none" }, h("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))))));
    }
    static get is() { return "fb-toast"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-toast.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-toast.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ToastVariant",
                    "resolved": "\"danger\" | \"info\" | \"success\" | \"warning\"",
                    "references": {
                        "ToastVariant": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-toast/fb-toast.tsx",
                            "id": "src/components/fb-toast/fb-toast.tsx::ToastVariant"
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
                "attribute": "variant",
                "defaultValue": "'info'"
            },
            "message": {
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
                "attribute": "message",
                "defaultValue": "''"
            },
            "visible": {
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
                "attribute": "visible",
                "defaultValue": "false"
            },
            "duration": {
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
                    "text": "Auto-dismiss delay in ms. 0 = no auto-dismiss. Minimum recommended: 5000"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "duration",
                "defaultValue": "6000"
            }
        };
    }
    static get states() {
        return {
            "animatingOut": {}
        };
    }
    static get events() {
        return [{
                "method": "fbDismiss",
                "name": "fbDismiss",
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
    static get watchers() {
        return [{
                "propName": "visible",
                "methodName": "onVisibleChange"
            }];
    }
}
