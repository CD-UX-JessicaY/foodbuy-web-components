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
        return (h(Host, { key: 'ae5d2e476d4f6cc4465eaaf5dd5274fa2d11fd49' }, h("span", { key: 'eea9a139d78cf6868f3fab702983f7f4ac8c54be', class: "fb-tooltip-wrapper", onMouseEnter: () => this.show(), onMouseLeave: () => this.hide(), onFocusin: () => this.show(), onFocusout: () => this.hide() }, h("span", { key: 'd1f206b0bad9a6349a7fbb35f97f9318429bccb3', "aria-describedby": this.visible ? this.tooltipId : null }, h("slot", { key: '6ec1783085a6913b0472f4c16dbb139f20523cba' })), this.visible && (h("span", { key: 'e417823a7b1f3ed1cb8d5c90d33d8c1aaceef528', id: this.tooltipId, role: "tooltip", class: `fb-tooltip fb-tooltip--${this.placement}` }, this.content)))));
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
