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
        return (h(Host, { key: 'a361a3556e8de45343b7ed777b434e1a14dce828' }, h("div", { key: 'f3ca6b0c8bfaa294a5ff7c8984427448d437cb58', class: "fb-switch-wrapper" }, h("label", { key: 'b71c9542c5857e4a08ff81ea8aea1dddc85ca4a6', htmlFor: this.switchId, class: { 'fb-switch-label': true, 'disabled': this.disabled } }, h("input", { key: 'fc94296d98673b5908a7ddb65b4b642f4afe7462', id: this.switchId, type: "checkbox", role: "switch", checked: this.checked, disabled: this.disabled, "aria-checked": this.checked ? 'true' : 'false', "aria-describedby": hasHelper ? this.helperId : null, class: "native-switch", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), h("span", { key: 'fe4a04b5afb9f5b2c399f720405f6f646c9c3324', "aria-hidden": "true", class: { 'switch-track': true, 'on': this.checked } }, h("span", { key: '62fb0c4d364b9ffb445ca3f48622e77d57685bda', class: "switch-thumb" })), this.label && h("span", { key: '536403e7c66d83a84a1571301b82259f2a293782', class: "label-text" }, this.label)), hasHelper && (h("div", { key: 'ad9b86c37dfadc69611764a3a5879c8d9a2ea881', id: this.helperId, class: "fb-helper" }, this.helperText)))));
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
