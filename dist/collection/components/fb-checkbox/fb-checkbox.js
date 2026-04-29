import { h, Host } from "@stencil/core";
import { renderHelperText } from "../../utils/field-helpers";
let idCounter = 0;
export class FbCheckbox {
    constructor() {
        /** Visible label */
        this.label = '';
        this.checked = false;
        /** Shows a dash/minus — used for "select all" when some items are selected */
        this.indeterminate = false;
        this.state = 'default';
        this.size = 'md';
        this.helperText = '';
        this.required = false;
        /** Explicit value used when inside a form */
        this.value = 'on';
    }
    connectedCallback() {
        idCounter++;
        this.inputId = `fb-checkbox-${idCounter}`;
        this.helperId = `fb-checkbox-helper-${idCounter}`;
    }
    get isDisabled() { return this.state === 'disabled'; }
    get isError() { return this.state === 'error'; }
    render() {
        const hasHelper = !!this.helperText;
        return (h(Host, { key: '61220a70cc6bb2f1e3bb22320e212bc6a115d8fc' }, h("div", { key: '1400c693a91b1f55859baebf67e147d4f06c934d', class: "fb-checkbox-wrapper" }, h("label", { key: 'e09e5bd0c60c67eaa5dab1c2ec3908b6fc7bd336', htmlFor: this.inputId, class: {
                'fb-checkbox-label': true,
                'disabled': this.isDisabled,
            } }, h("input", { key: '9a42317546b0d1a3fd787a3a85d9994ec7261d7f', id: this.inputId, type: "checkbox", checked: this.checked, disabled: this.isDisabled, required: this.required, value: this.value, "aria-label": !this.label ? 'Checkbox' : null, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null,
            // indeterminate must be set as a property, not attribute
            ref: (el) => {
                if (el)
                    el.indeterminate = this.indeterminate;
            }, class: "native-checkbox", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), h("span", { key: '6151f47f93fad42553f86277ba24c5a9e564decc', "aria-hidden": "true", class: {
                'checkbox-box': true,
                [`size-${this.size}`]: true,
                'checked': this.checked || this.indeterminate,
                'error': this.isError,
            } }, this.indeterminate
            ? h("svg", { width: "10", height: "2", viewBox: "0 0 10 2", fill: "none" }, h("path", { d: "M1 1h8", stroke: "white", "stroke-width": "2", "stroke-linecap": "round" }))
            : this.checked
                ? h("svg", { width: "10", height: "8", viewBox: "0 0 10 8", fill: "none" }, h("path", { d: "M1 4l3 3 5-5", stroke: "white", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }))
                : null), this.label && h("span", { key: '8a18867dea05826b18e3909c5c54fe73acc0846e', class: "label-text" }, this.label)), renderHelperText(this.helperText, this.helperId, this.isError))));
    }
    static get is() { return "fb-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-checkbox.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-checkbox.css"]
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
            "indeterminate": {
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
                    "text": "Shows a dash/minus \u2014 used for \"select all\" when some items are selected"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "indeterminate",
                "defaultValue": "false"
            },
            "state": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "CheckboxState",
                    "resolved": "\"default\" | \"disabled\" | \"error\"",
                    "references": {
                        "CheckboxState": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-checkbox/fb-checkbox.tsx",
                            "id": "src/components/fb-checkbox/fb-checkbox.tsx::CheckboxState"
                        }
                    }
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
                "attribute": "state",
                "defaultValue": "'default'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "CheckboxSize",
                    "resolved": "\"lg\" | \"md\" | \"sm\"",
                    "references": {
                        "CheckboxSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-checkbox/fb-checkbox.tsx",
                            "id": "src/components/fb-checkbox/fb-checkbox.tsx::CheckboxSize"
                        }
                    }
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
                "attribute": "size",
                "defaultValue": "'md'"
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
            },
            "required": {
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
                "attribute": "required",
                "defaultValue": "false"
            },
            "value": {
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
                    "text": "Explicit value used when inside a form"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value",
                "defaultValue": "'on'"
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
