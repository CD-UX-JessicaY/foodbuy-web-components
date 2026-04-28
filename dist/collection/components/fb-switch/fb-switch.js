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
        return (h(Host, { key: '2823bdece8351f74027953fced0b421d9ad4b886' }, h("div", { key: 'eee0f1e1e241e9e1ac378f0c426b6f15c251c5c1', class: "fb-switch-wrapper" }, h("label", { key: '7fafc30dabd6c79b8d9bceeec9112b60c637408b', htmlFor: this.switchId, class: { 'fb-switch-label': true, 'disabled': this.disabled } }, h("input", { key: 'ec8115e055c61e31e7b2ef2695ad18af5a3cf3a3', id: this.switchId, type: "checkbox", role: "switch", checked: this.checked, disabled: this.disabled, "aria-checked": this.checked ? 'true' : 'false', "aria-describedby": hasHelper ? this.helperId : null, class: "native-switch", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), h("span", { key: 'e85631a7c9e0ce732bbf947a0583ec4b1e5a68a2', "aria-hidden": "true", class: { 'switch-track': true, 'on': this.checked } }, h("span", { key: 'dfbfaff05c44d8c7f996f9ebbb0997def1517159', class: "switch-thumb" })), this.label && h("span", { key: '7b1d5e639fa61912a567ce729c487d825ee47fc0', class: "label-text" }, this.label)), hasHelper && (h("div", { key: '0874c61dfd0f0a4fc5d2debb34029b804163fa4b', id: this.helperId, class: "fb-helper" }, this.helperText)))));
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
