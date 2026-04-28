import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbInput {
    constructor() {
        /** Visible label text — always provide this for accessibility */
        this.label = '';
        /** HTML input type */
        this.type = 'text';
        /** Size variant */
        this.size = 'default';
        /** Visual and interaction state */
        this.state = 'default';
        /** Placeholder text */
        this.placeholder = '';
        /** Current value */
        this.value = '';
        /** Helper or error message shown below the input */
        this.helperText = '';
        /** Marks the field as required */
        this.required = false;
        /** Marks the field as required */
        this.clearable = false;
        /** Left adornment text (e.g. "$") */
        this.prefixText = '';
        /** Right adornment text (e.g. ".00") */
        this.suffixText = '';
        this.showPassword = false;
        this.handleInput = (e) => {
            const val = e.target.value;
            this.value = val;
            this.fbChange.emit(val);
        };
        this.handleClear = () => {
            var _a, _b;
            this.value = '';
            this.fbChange.emit('');
            // Return focus to the input after clearing
            (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input')) === null || _b === void 0 ? void 0 : _b.focus();
        };
        this.togglePassword = () => {
            this.showPassword = !this.showPassword;
        };
    }
    connectedCallback() {
        idCounter++;
        this.inputId = `fb-input-${idCounter}`;
        this.helperId = `fb-input-helper-${idCounter}`;
    }
    get isDisabled() { return this.state === 'disabled'; }
    get isReadOnly() { return this.state === 'read-only'; }
    get isError() { return this.state === 'error'; }
    render() {
        const isPassword = this.type === 'password';
        const isSearch = this.type === 'search';
        const inputType = isPassword && this.showPassword ? 'text' : this.type;
        const showClear = this.clearable && !!this.value && !this.isDisabled && !this.isReadOnly;
        const hasHelper = !!this.helperText;
        return (h(Host, { key: 'c19a75125b0e3d61f02a35ce377564c65a2a68bb' }, h("div", { key: '138894813510003f7c2cda6fd380aae26292a371', class: "fb-input-wrapper" }, this.label && (h("label", { key: 'a5da644d57a86bf4a2823e62e908a23b6c9a8dbd', htmlFor: this.inputId, class: "fb-label" }, this.label, this.required && (h("span", { key: 'cb3140b9caaf80335f1c052a36b03f331b92a3be', class: "required-indicator", "aria-hidden": "true" }, " *")))), h("div", { key: '252b3591729a1a04635c684aa70c592926cd37fb', class: {
                'fb-input-field': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            } }, isSearch && (h("span", { key: '580cf854e4215e0ce2cd9a7a54d8a7205be069d9', class: "adornment adornment--prefix-icon", "aria-hidden": "true" }, h("svg", { key: 'd9488cb9a812d32a874a1592da900e2fb21026d7', width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: '87f5f1e3f074b3b06de96d76fb7c7e27b5c58e07', cx: "11", cy: "11", r: "8" }), h("path", { key: '3817050505842284b9e5d85933b64918241e9331', d: "M21 21l-4.35-4.35" })))), this.prefixText && (h("span", { key: 'd0661658dec2f6eba70d506d35b3710e0edaa3ca', class: "adornment adornment--prefix", "aria-hidden": "true" }, this.prefixText)), h("input", { key: 'b1f4945c706f50b8b570ff46b52d69ebdf403faf', id: this.inputId, type: inputType, value: this.value, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, class: "native-input", onInput: this.handleInput, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }), showClear && (h("button", { key: 'f55cb25aa41493c77cdd85c1f1a2ba557f29c4cb', type: "button", class: "adornment-btn", "aria-label": "Clear input", onClick: this.handleClear }, h("svg", { key: '1f69e98fe63af3853b544111dc5dec0b985fd3f2', "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }, h("path", { key: '087dc6982b967f89bd8261934b534b51816d5580', d: "M2 2l8 8M10 2l-8 8" })))), this.suffixText && (h("span", { key: '7de06ac4ebc440d272e01d0e24f594a6e89f73d3', class: "adornment adornment--suffix", "aria-hidden": "true" }, this.suffixText)), isPassword && (h("button", { key: '5543908cf96453c9a2af9368834ab1811fc531ec', type: "button", class: "adornment-btn", "aria-label": this.showPassword ? 'Hide password' : 'Show password', "aria-pressed": this.showPassword ? 'true' : 'false', onClick: this.togglePassword }, this.showPassword
            ? h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" }), h("line", { x1: "1", y1: "1", x2: "23", y2: "23" }))
            : h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), h("circle", { cx: "12", cy: "12", r: "3" }))))), hasHelper && (h("div", { key: 'a3861b09a84aa620451f19c4d7425fd6b4df7fa3', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError },
            // role="alert" on error ensures it's announced immediately
            role: this.isError ? 'alert' : null }, this.isError && (h("svg", { key: 'a43af0e6a9774a2cd33ea36e675f97ab64a07ddd', "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "helper-icon" }, h("circle", { key: '0670c0a574ba51f6932abec795c242db7f119561', cx: "12", cy: "12", r: "10" }), h("line", { key: '206798fc71880dc871f698afd99a3c0b1997e936', x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { key: '8410c162e2030baf60799bb2c64c8d83ee41ee65', x1: "12", y1: "16", x2: "12.01", y2: "16" }))), this.helperText)))));
    }
    static get is() { return "fb-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-input.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-input.css"]
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
                    "text": "Visible label text \u2014 always provide this for accessibility"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "''"
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "InputType",
                    "resolved": "\"email\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"url\"",
                    "references": {
                        "InputType": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-input/fb-input.tsx",
                            "id": "src/components/fb-input/fb-input.tsx::InputType"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "HTML input type"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "type",
                "defaultValue": "'text'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "InputSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "InputSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-input/fb-input.tsx",
                            "id": "src/components/fb-input/fb-input.tsx::InputSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Size variant"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "size",
                "defaultValue": "'default'"
            },
            "state": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "InputState",
                    "resolved": "\"default\" | \"disabled\" | \"error\" | \"read-only\"",
                    "references": {
                        "InputState": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-input/fb-input.tsx",
                            "id": "src/components/fb-input/fb-input.tsx::InputState"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Visual and interaction state"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "state",
                "defaultValue": "'default'"
            },
            "placeholder": {
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
                    "text": "Placeholder text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "placeholder",
                "defaultValue": "''"
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
                    "text": "Current value"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value",
                "defaultValue": "''"
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
                    "text": "Helper or error message shown below the input"
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
                    "text": "Marks the field as required"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "required",
                "defaultValue": "false"
            },
            "clearable": {
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
                    "text": "Marks the field as required"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "clearable",
                "defaultValue": "false"
            },
            "prefixText": {
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
                    "text": "Left adornment text (e.g. \"$\")"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "prefix-text",
                "defaultValue": "''"
            },
            "suffixText": {
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
                    "text": "Right adornment text (e.g. \".00\")"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "suffix-text",
                "defaultValue": "''"
            }
        };
    }
    static get states() {
        return {
            "showPassword": {}
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
                    "text": "Fired when the value changes"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "fbFocus",
                "name": "fbFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the input receives focus"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "fbBlur",
                "name": "fbBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the input loses focus"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
