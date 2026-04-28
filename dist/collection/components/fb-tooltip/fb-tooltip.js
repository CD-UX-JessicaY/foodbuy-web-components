import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbTooltip {
    constructor() {
        this.content = '';
        this.placement = 'top';
        this.visible = false;
    }
    connectedCallback() {
        idCounter++;
        this.tooltipId = `fb-tooltip-${idCounter}`;
    }
    show() { this.visible = true; }
    hide() { this.visible = false; }
    render() {
        return (h(Host, { key: '40ad7fb5108d391946d87e2462e9237fa72097ba' }, h("span", { key: '9ac62f2b8225b59d9ecb4b285bee5d750483000b', class: "fb-tooltip-wrapper", onMouseEnter: () => this.show(), onMouseLeave: () => this.hide(), onFocusin: () => this.show(), onFocusout: () => this.hide() }, h("span", { key: '8050ae1a404ba4e1c9c11e6ea61c833b9bae4511', "aria-describedby": this.visible ? this.tooltipId : null }, h("slot", { key: 'b5712cbc43937ff0ea319c4dca3b56e86ead4e57' })), this.visible && (h("span", { key: '947741ae81c6326b7e71b556c6af3ef52c408447', id: this.tooltipId, role: "tooltip", class: `fb-tooltip fb-tooltip--${this.placement}` }, this.content)))));
    }
    static get is() { return "fb-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-tooltip.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-tooltip.css"]
        };
    }
    static get properties() {
        return {
            "content": {
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
                "attribute": "content",
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
                "defaultValue": "'top'"
            }
        };
    }
    static get states() {
        return {
            "visible": {}
        };
    }
    static get elementRef() { return "el"; }
}
