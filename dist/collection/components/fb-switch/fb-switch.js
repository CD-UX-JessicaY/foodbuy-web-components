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
        return (h(Host, { key: 'b7e6238aacf1c654665ae27ebc8cff5a7e4dc88e' }, h("div", { key: 'b41a7018ca86930b381ab7867b9ae008d878d642', class: "fb-switch-wrapper" }, h("label", { key: '27a5136fd7e1254d0bca6e0f87396f6f72e7e1ad', htmlFor: this.switchId, class: { 'fb-switch-label': true, 'disabled': this.disabled } }, h("input", { key: '8679f2cc0c6bb681049cf0565c01793e40b2879c', id: this.switchId, type: "checkbox", role: "switch", checked: this.checked, disabled: this.disabled, "aria-checked": this.checked ? 'true' : 'false', "aria-describedby": hasHelper ? this.helperId : null, class: "native-switch", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), h("span", { key: '17c012b3587cf5bd7e4391fbaf1fa88c7477babc', "aria-hidden": "true", class: { 'switch-track': true, 'on': this.checked } }, h("span", { key: 'ae0dcab4bbc1e894a40b41ed8745be1a18c4ba3b', class: "switch-thumb" })), this.label && h("span", { key: '7c2ab00b3d0f6475d610bea0781c551a0096f86b', class: "label-text" }, this.label)), hasHelper && (h("div", { key: '0616644749fb204cf9a556c43e11d882195e7198', id: this.helperId, class: "fb-helper" }, this.helperText)))));
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
