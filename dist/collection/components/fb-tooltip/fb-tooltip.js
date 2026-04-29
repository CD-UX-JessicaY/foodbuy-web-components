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
        return (h(Host, { key: '8569c809ebe14ce0696b148333305f12b24aaf3c' }, h("span", { key: 'fa84e90a283af458fdd6643823e7176219e318bb', class: "fb-tooltip-wrapper", onMouseEnter: () => this.show(), onMouseLeave: () => this.hide(), onFocusin: () => this.show(), onFocusout: () => this.hide() }, h("span", { key: 'ebeb071f32282a15c297eb82d79f4d9bf1e3b350', "aria-describedby": this.visible ? this.tooltipId : null }, h("slot", { key: '42c3cba8eb682a20c0c658cf90102b01f4b29c20' })), this.visible && (h("span", { key: 'a543cb7843d4c692f890f1ec9a899d70cfc7c80c', id: this.tooltipId, role: "tooltip", class: `fb-tooltip fb-tooltip--${this.placement}` }, this.content)))));
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
