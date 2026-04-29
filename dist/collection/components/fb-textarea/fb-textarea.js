import { h, Host } from "@stencil/core";
import { renderFieldLabel, renderHelperText } from "../../utils/field-helpers";
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
        return (h(Host, { key: 'c2bf79e082bf30306b2506bcc3095ccf7785c22f' }, h("div", { key: 'bc55a222165d2f7b3c22f9c2923831a1f7a4a233', class: "fb-textarea-wrapper" }, renderFieldLabel(this.label, this.required, this.textareaId), h("textarea", { key: 'd100ecfa79137deaffd98c8c968d637de86cbe9c', id: this.textareaId, rows: this.rows, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, maxLength: this.maxLength, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": describedBy, class: {
                'fb-textarea': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            }, onInput: (e) => {
                const val = e.target.value;
                this.value = val;
                this.fbChange.emit(val);
            }, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }, this.value), h("div", { key: 'c2bbb35e7cba35cbda4b9ba5aea953fb7a08fdf8', class: "fb-textarea-footer" }, renderHelperText(this.helperText, this.helperId, this.isError), showCounter && (
        // aria-live="polite" announces the count as the user types
        h("div", { key: 'bc64d0193c45f762758472053367f64f9eaa5f7c', id: counterId, class: { 'fb-counter': true, 'fb-counter--limit': charCount >= this.maxLength }, "aria-live": "polite" }, charCount, "/", this.maxLength))))));
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
