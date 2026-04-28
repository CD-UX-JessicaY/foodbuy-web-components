import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbSwitch {
    constructor() {
        /** Visible label */
        this.label = '';
        this.checked = false;
        this.disabled = false;
        this.helperText = '';
    }
    connectedCallback() {
        idCounter++;
        this.switchId = `fb-switch-${idCounter}`;
        this.helperId = `fb-switch-helper-${idCounter}`;
    }
    render() {
        const hasHelper = !!this.helperText;
        return (h(Host, { key: 'b25865eb469e9324c70bb1d6f280bd6298557130' }, h("div", { key: 'd35b0d45c0a7cb174e9f3a33eb939d52a4a9e5e5', class: "fb-switch-wrapper" }, h("label", { key: 'fde740a50cd1fe17a1f8b81bbbfc42224143a03e', htmlFor: this.switchId, class: { 'fb-switch-label': true, 'disabled': this.disabled } }, h("input", { key: 'e261e41a283096129a78c84df59a7cda645ea9b2', id: this.switchId, type: "checkbox", role: "switch", checked: this.checked, disabled: this.disabled, "aria-checked": this.checked ? 'true' : 'false', "aria-describedby": hasHelper ? this.helperId : null, class: "native-switch", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), h("span", { key: 'feb6fb46c0466b739298c3abfcae8ffc2ce639ce', "aria-hidden": "true", class: { 'switch-track': true, 'on': this.checked } }, h("span", { key: 'e50b16fb47b6f193a55a3bcbf54c843f9a19efb0', class: "switch-thumb" })), this.label && h("span", { key: '07a1e87c7d6bee2601058fdeeeb2872862c15829', class: "label-text" }, this.label)), hasHelper && (h("div", { key: '86f44f92f7d945ea8aa347c3b01f7e9e93242ffc', id: this.helperId, class: "fb-helper" }, this.helperText)))));
    }
    static get is() { return "fb-switch"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-switch.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-switch.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "Visible label"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "''"
            },
            "checked": {
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
                "attribute": "checked",
                "defaultValue": "false"
            },
            "disabled": {
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
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "helperText": {
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
                "attribute": "helper-text",
                "defaultValue": "''"
            }
        };
    }
    static get events() {
        return [{
                "method": "fbChange",
                "name": "fbChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
}
