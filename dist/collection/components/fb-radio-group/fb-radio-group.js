import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbRadioGroup {
    constructor() {
        /** Group label — rendered as <legend> inside a <fieldset> */
        this.label = '';
        this.options = '[]';
        this.value = '';
        this.required = false;
        this.disabled = false;
        this.helperText = '';
        this.state = 'default';
    }
    connectedCallback() {
        idCounter++;
        this.groupName = `fb-radio-group-${idCounter}`;
        this.helperId = `fb-radio-helper-${idCounter}`;
    }
    get parsedOptions() {
        if (typeof this.options === 'string') {
            try {
                return JSON.parse(this.options);
            }
            catch (_a) {
                return [];
            }
        }
        return this.options;
    }
    get isError() { return this.state === 'error'; }
    render() {
        const options = this.parsedOptions;
        const hasHelper = !!this.helperText;
        return (h(Host, { key: 'c1dcd925bee51b2b16a55b6aec766f752e9dcc75' }, h("fieldset", { key: 'e18b0a24b04f2ab486ae75aba16002a84e07fee9', class: { 'fb-radio-group': true, 'has-error': this.isError }, disabled: this.disabled, "aria-describedby": hasHelper ? this.helperId : null, "aria-required": this.required ? 'true' : null }, h("legend", { key: 'c09d542ca39832ed8a8ef7fecfa9639d82c3a194', class: "fb-legend" }, this.label || 'Select an option'), h("div", { key: '2a5c1040d14f1961879f27ece76a09df7d9e7b5f', class: "options-list" }, options.map((opt) => {
            const optId = `${this.groupName}-${opt.value}`;
            return (h("label", { key: opt.value, htmlFor: optId, class: {
                    'fb-radio-label': true,
                    'disabled': opt.disabled || this.disabled,
                } }, h("input", { id: optId, type: "radio", name: this.groupName, value: opt.value, checked: this.value === opt.value, disabled: opt.disabled || this.disabled, required: this.required, class: "native-radio", onChange: () => {
                    this.value = opt.value;
                    this.fbChange.emit(opt.value);
                } }), h("span", { "aria-hidden": "true", class: { 'radio-dot': true, 'checked': this.value === opt.value } }), h("span", { class: "option-label" }, opt.label)));
        })), hasHelper && (h("div", { key: 'c9c699b3a09ce1f465c9f31d6cb29a256959445e', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.helperText)))));
    }
    static get is() { return "fb-radio-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-radio-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-radio-group.css"]
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
                    "text": "Group label \u2014 rendered as <legend> inside a <fieldset>"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "''"
            },
            "options": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "RadioOption[] | string",
                    "resolved": "RadioOption[] | string",
                    "references": {
                        "RadioOption": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-radio-group/fb-radio-group.tsx",
                            "id": "src/components/fb-radio-group/fb-radio-group.tsx::RadioOption"
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
                "attribute": "options",
                "defaultValue": "'[]'"
            },
            "value": {
                "type": "string",
                "mutable": true,
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
                "attribute": "value",
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
            },
            "state": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'default' | 'error'",
                    "resolved": "\"default\" | \"error\"",
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
                "attribute": "state",
                "defaultValue": "'default'"
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
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }];
    }
}
