import { h, Host } from "@stencil/core";
export class FbAlert {
    constructor() {
        this.variant = 'info';
        this.heading = '';
        this.description = '';
        this.dismissible = false;
        this.dismissed = false;
        this.handleDismiss = () => {
            this.dismissed = true;
            this.fbDismiss.emit();
        };
    }
    render() {
        if (this.dismissed)
            return null;
        return (h(Host, null, h("div", { role: this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status', class: { 'fb-alert': true, [`variant-${this.variant}`]: true } }, h("span", { class: "alert-icon", "aria-hidden": "true" }, this.variant === 'info' && h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M9 8v5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("circle", { cx: "9", cy: "5.5", r: ".75", fill: "currentColor" })), this.variant === 'success' && h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M5.5 9l2.5 2.5 4.5-5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })), this.variant === 'warning' && h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, h("path", { d: "M9 2L16.5 15H1.5L9 2Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), h("path", { d: "M9 7v4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("circle", { cx: "9", cy: "12.5", r: ".75", fill: "currentColor" })), this.variant === 'danger' && h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M6 6l6 6M12 6l-6 6", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))), h("div", { class: "alert-content" }, this.heading && h("p", { class: "alert-title" }, this.heading), this.description && h("p", { class: "alert-description" }, this.description), h("slot", null)), this.dismissible && (h("button", { type: "button", class: "dismiss-btn", "aria-label": "Dismiss alert", onClick: this.handleDismiss }, h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, h("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })))))));
    }
    static get is() { return "fb-alert"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-alert.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-alert.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "AlertVariant",
                    "resolved": "\"danger\" | \"info\" | \"success\" | \"warning\"",
                    "references": {
                        "AlertVariant": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-alert/fb-alert.tsx",
                            "id": "src/components/fb-alert/fb-alert.tsx::AlertVariant"
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
            "dismissible": {
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
                "attribute": "dismissible",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "dismissed": {}
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
}
