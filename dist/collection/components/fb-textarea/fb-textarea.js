import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbTextarea {
    constructor() {
        /** Visible label — always provide for accessibility */
        this.label = '';
        this.size = 'default';
        this.state = 'default';
        this.placeholder = '';
        this.value = '';
        this.helperText = '';
        this.required = false;
        /** Number of visible text rows */
        this.rows = 4;
    }
    connectedCallback() {
        idCounter++;
        this.textareaId = `fb-textarea-${idCounter}`;
        this.helperId = `fb-textarea-helper-${idCounter}`;
    }
    get isDisabled() { return this.state === 'disabled'; }
    get isReadOnly() { return this.state === 'read-only'; }
    get isError() { return this.state === 'error'; }
    render() {
        var _a, _b;
        const hasHelper = !!this.helperText;
        const charCount = (_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        const showCounter = !!this.maxLength;
        const counterId = showCounter ? `${this.textareaId}-counter` : null;
        const describedBy = [hasHelper ? this.helperId : null, counterId].filter(Boolean).join(' ') || null;
        return (h(Host, { key: '861010b21c4f0832357fba79b662b55c8413f42f' }, h("div", { key: '7b4379647848e16f1a28775242cd70f5b322e67b', class: "fb-textarea-wrapper" }, this.label && (h("label", { key: '22486a5f45e212fabc69e76901fbbda3e827292a', htmlFor: this.textareaId, class: "fb-label" }, this.label, this.required && h("span", { key: 'b845a86f344933d535aea7131e80c82f5f6e553b', class: "required-indicator", "aria-hidden": "true" }, " *"))), h("textarea", { key: '5385a350987adb2888d610e6e48b62df895d6b9f', id: this.textareaId, rows: this.rows, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, maxLength: this.maxLength, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": describedBy, class: {
                'fb-textarea': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            }, onInput: (e) => {
                const val = e.target.value;
                this.value = val;
                this.fbChange.emit(val);
            }, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }, this.value), h("div", { key: '83509904800604fda1018e715339323d4f0e9589', class: "fb-textarea-footer" }, hasHelper && (h("div", { key: '12874bbf397b65d713e285266c29978e7d2e5cb3', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.isError && (h("svg", { key: '490c0bfc75f90a7e5f9a68e1907564a5e6549822', "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: 'd31a3ebd3238c3ef3338b955f4344469f3404919', cx: "12", cy: "12", r: "10" }), h("line", { key: '3aa32a60d7f5682de6cf2b51decc9916e1e81a52', x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { key: 'c937a43d9ec8a28d5a8ee3dca8d78d4b1198c428', x1: "12", y1: "16", x2: "12.01", y2: "16" }))), this.helperText)), showCounter && (
        // aria-live="polite" announces the count as the user types
        h("div", { key: '150f34fdd0d53e1f0427945f9d450c16fd30b753', id: counterId, class: { 'fb-counter': true, 'fb-counter--limit': charCount >= this.maxLength }, "aria-live": "polite" }, charCount, "/", this.maxLength))))));
    }
    static get is() { return "fb-textarea"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-textarea.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-textarea.css"]
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
                    "text": "Visible label \u2014 always provide for accessibility"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "''"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TextareaSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "TextareaSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-textarea/fb-textarea.tsx",
                            "id": "src/components/fb-textarea/fb-textarea.tsx::TextareaSize"
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
                "defaultValue": "'default'"
            },
            "state": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TextareaState",
                    "resolved": "\"default\" | \"disabled\" | \"error\" | \"read-only\"",
                    "references": {
                        "TextareaState": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-textarea/fb-textarea.tsx",
                            "id": "src/components/fb-textarea/fb-textarea.tsx::TextareaState"
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
                    "text": ""
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
                    "text": ""
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
            "rows": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Number of visible text rows"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "rows",
                "defaultValue": "4"
            },
            "maxLength": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Character limit \u2014 shows counter when set"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "max-length"
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
            }, {
                "method": "fbFocus",
                "name": "fbFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
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
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
