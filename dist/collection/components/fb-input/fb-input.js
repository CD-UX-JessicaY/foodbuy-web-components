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
        return (h(Host, { key: '501dbfd7ae93b0e51ce4c3d0bd619e045736b061' }, h("div", { key: '51b4a65735afc532b75fea09abab5fd5f8131189', class: "fb-input-wrapper" }, this.label && (h("label", { key: '3440eca48ad42f0bfa6de6e2d65cedac2d570e78', htmlFor: this.inputId, class: "fb-label" }, this.label, this.required && (h("span", { key: '4d66eff64d4a49741588090932d2f977f5dcb0c7', class: "required-indicator", "aria-hidden": "true" }, " *")))), h("div", { key: '9cd08463dcd270201ec10ef302d3315fadc30053', class: {
                'fb-input-field': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            } }, isSearch && (h("span", { key: '120d7442cf932dd4a4fb2ef86b92be11d7db67fb', class: "adornment adornment--prefix-icon", "aria-hidden": "true" }, h("svg", { key: 'fb4b4823993a2439ffa0ab4617a016f8b36ec43d', width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: 'fe37e403d81b380845fb221e71310edf3464602f', cx: "11", cy: "11", r: "8" }), h("path", { key: '53235a8327bb70fbd644706fae6aa2a24ae5346c', d: "M21 21l-4.35-4.35" })))), this.prefixText && (h("span", { key: 'c128b46d5d73fd8fb84b2789287cf39fb6d2ca6a', class: "adornment adornment--prefix", "aria-hidden": "true" }, this.prefixText)), h("input", { key: '0b40da4e9ef8ea8b39fb379cb0901febefbddce6', id: this.inputId, type: inputType, value: this.value, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, class: "native-input", onInput: this.handleInput, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }), showClear && (h("button", { key: '814e1f0f780046b719a3760f732febc228a704b1', type: "button", class: "adornment-btn", "aria-label": "Clear input", onClick: this.handleClear }, h("svg", { key: 'fce99179f2b28508c3e56d8a59c4cc8e6e4687bd', "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }, h("path", { key: '2948c66622d750256932e98afc3033c25ac40ea1', d: "M2 2l8 8M10 2l-8 8" })))), this.suffixText && (h("span", { key: '446b277e4c822d121ca0b354203fee8141be33fb', class: "adornment adornment--suffix", "aria-hidden": "true" }, this.suffixText)), isPassword && (h("button", { key: '9ef93cb8ac5ca5ee3b73ba066ae3f890e0d3241f', type: "button", class: "adornment-btn", "aria-label": this.showPassword ? 'Hide password' : 'Show password', "aria-pressed": this.showPassword ? 'true' : 'false', onClick: this.togglePassword }, this.showPassword
            ? h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" }), h("line", { x1: "1", y1: "1", x2: "23", y2: "23" }))
            : h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), h("circle", { cx: "12", cy: "12", r: "3" }))))), hasHelper && (h("div", { key: 'aca27294882789dd4fd6e7180407552bd9cab17e', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError },
            // role="alert" on error ensures it's announced immediately
            role: this.isError ? 'alert' : null }, this.isError && (h("svg", { key: '4630b2b06952a71bcf1fdc08cdbc3762a2707e14', "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "helper-icon" }, h("circle", { key: '7fcb32aff22f88e4f6c1e39e60b50bb1381a5754', cx: "12", cy: "12", r: "10" }), h("line", { key: 'e6b26566857f3fd41fe43fc5b79cf72a228f189e', x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { key: '923db20814434b6723e23e94db1413e001fa73a7', x1: "12", y1: "16", x2: "12.01", y2: "16" }))), this.helperText)))));
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
