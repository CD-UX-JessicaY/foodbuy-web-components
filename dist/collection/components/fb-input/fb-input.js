import { h, Host } from "@stencil/core";
import { renderFieldLabel, renderHelperText } from "../../utils/field-helpers";
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
        return (h(Host, { key: 'fd8bcedfdd1cfa188e8efe9c5a449bfd32376f1c' }, h("div", { key: 'de8e510b90b21522d9608463afec07d44a1cb824', class: "fb-input-wrapper" }, renderFieldLabel(this.label, this.required, this.inputId), h("div", { key: 'ee50c44e40a05a0bda94a623aac808dcfb0a2266', class: {
                'fb-input-field': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            } }, isSearch && (h("span", { key: '69e363400ac11cee6bb262034cff4efee898f6dd', class: "adornment adornment--prefix-icon", "aria-hidden": "true" }, h("svg", { key: 'cbc4cee118d5275c7ba22582f45cc6bec0a0eae7', width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: 'fa822db0b34dee1d06ef9d2286f58de94bb5edbf', cx: "11", cy: "11", r: "8" }), h("path", { key: '94c9e037ab8d02cbdfdc142b3ac7ada3052f6d22', d: "M21 21l-4.35-4.35" })))), this.prefixText && (h("span", { key: '49696a6da27d0f4c7cdcbc293be527660244e419', class: "adornment adornment--prefix", "aria-hidden": "true" }, this.prefixText)), h("input", { key: '1277177f67bb62333f5334cc895087758b7f8890', id: this.inputId, type: inputType, value: this.value, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, class: "native-input", onInput: this.handleInput, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }), showClear && (h("button", { key: '692c94a84cf32d63657a845fb5431fbc233f99e7', type: "button", class: "adornment-btn", "aria-label": "Clear input", onClick: this.handleClear }, h("svg", { key: 'ed742dde60da4c5732a5d2e82aba4ac3de8ea8fc', "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }, h("path", { key: 'c8b721621e4c7cc57db989509fd5e4a28e5b732d', d: "M2 2l8 8M10 2l-8 8" })))), this.suffixText && (h("span", { key: 'cadaaa9331bea4e5db0df691e4de182ff38556c6', class: "adornment adornment--suffix", "aria-hidden": "true" }, this.suffixText)), isPassword && (h("button", { key: 'd5af5315bdfc290a908a8348592d829de21804ed', type: "button", class: "adornment-btn", "aria-label": this.showPassword ? 'Hide password' : 'Show password', "aria-pressed": this.showPassword ? 'true' : 'false', onClick: this.togglePassword }, this.showPassword
            ? h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" }), h("line", { x1: "1", y1: "1", x2: "23", y2: "23" }))
            : h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), h("circle", { cx: "12", cy: "12", r: "3" }))))), renderHelperText(this.helperText, this.helperId, this.isError))));
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
