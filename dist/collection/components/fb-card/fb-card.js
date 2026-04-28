import { h, Host } from "@stencil/core";
export class FbCard {
    constructor() {
        this.href = '';
        this.clickable = false;
        this.label = '';
        this.padding = 'default';
        this.shadow = 'default';
    }
    render() {
        const classes = {
            'fb-card': true,
            [`fb-card--padding-${this.padding}`]: true,
            [`fb-card--shadow-${this.shadow}`]: true,
            'fb-card--clickable': this.clickable || !!this.href,
        };
        // Clickable cards must be real interactive elements for keyboard and AT support
        if (this.href) {
            return (h(Host, null, h("a", { href: this.href, class: classes, "aria-label": this.label || null }, h("slot", { name: "header" }), h("slot", null), h("slot", { name: "footer" }))));
        }
        if (this.clickable) {
            return (h(Host, null, h("button", { type: "button", class: classes, "aria-label": this.label || null, onClick: () => this.fbCardClick.emit() }, h("slot", { name: "header" }), h("slot", null), h("slot", { name: "footer" }))));
        }
        return (h(Host, null, h("div", { class: classes }, h("slot", { name: "header" }), h("slot", null), h("slot", { name: "footer" }))));
    }
    static get is() { return "fb-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-card.css"]
        };
    }
    static get properties() {
        return {
            "href": {
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
                "attribute": "href",
                "defaultValue": "''"
            },
            "clickable": {
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
                "attribute": "clickable",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "''"
            },
            "padding": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'none' | 'sm' | 'default' | 'lg'",
                    "resolved": "\"default\" | \"lg\" | \"none\" | \"sm\"",
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
                "attribute": "padding",
                "defaultValue": "'default'"
            },
            "shadow": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'none' | 'sm' | 'default' | 'lg'",
                    "resolved": "\"default\" | \"lg\" | \"none\" | \"sm\"",
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
                "attribute": "shadow",
                "defaultValue": "'default'"
            }
        };
    }
    static get events() {
        return [{
                "method": "fbCardClick",
                "name": "fbCardClick",
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
