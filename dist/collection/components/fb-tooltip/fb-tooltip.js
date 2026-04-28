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
        return (h(Host, { key: '5c6e4c64e2eb61e0aec496f44ce933c3607dc6a5' }, h("span", { key: 'c5e348f4d520b955e56d39d5e399ea59bed9fc66', class: "fb-tooltip-wrapper", onMouseEnter: () => this.show(), onMouseLeave: () => this.hide(), onFocusin: () => this.show(), onFocusout: () => this.hide() }, h("span", { key: 'a3939c91652228608ac2490865b48d38b38b426b', "aria-describedby": this.visible ? this.tooltipId : null }, h("slot", { key: 'dd8e8bec3b3b696305c0e59da4d3a6ab693611df' })), this.visible && (h("span", { key: '86bbcfbf987d3d1c844c7fb325e80763b5a6ca85', id: this.tooltipId, role: "tooltip", class: `fb-tooltip fb-tooltip--${this.placement}` }, this.content)))));
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
