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
        return (h(Host, { key: '7f20cf5e0eab30491eb3b76be6a1f70f7770ba8b' }, h("div", { key: 'fb692aced4ba86f6452fda63a37a94ade07fac4a', class: "fb-switch-wrapper" }, h("label", { key: '5e98d84412ac8237140ec68ce6a6086bcca18443', htmlFor: this.switchId, class: { 'fb-switch-label': true, 'disabled': this.disabled } }, h("input", { key: '9d03d9ed494b735ba5b6c81ece1dda09130bf4d2', id: this.switchId, type: "checkbox", role: "switch", checked: this.checked, disabled: this.disabled, "aria-checked": this.checked ? 'true' : 'false', "aria-describedby": hasHelper ? this.helperId : null, class: "native-switch", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), h("span", { key: 'd9f3001a9a34fa2cbd168cf0db23144dae771c61', "aria-hidden": "true", class: { 'switch-track': true, 'on': this.checked } }, h("span", { key: 'd66e64a04438381782fd1e77bfbe49e17a507a86', class: "switch-thumb" })), this.label && h("span", { key: 'b84109c03fae55ac9e23823720008e5bec007fea', class: "label-text" }, this.label)), hasHelper && (h("div", { key: '544bccc9cd4b949e25c506695dbe443b2fbdfd41', id: this.helperId, class: "fb-helper" }, this.helperText)))));
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
