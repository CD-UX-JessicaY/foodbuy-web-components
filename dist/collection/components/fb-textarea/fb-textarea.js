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
        return (h(Host, { key: '630b8868b728ea7c4f8a4f35fa011dfaa6a7eda2' }, h("div", { key: '74753e90d501a52cdc5ee9a4e88da136a82e5dde', class: "fb-textarea-wrapper" }, this.label && (h("label", { key: '1dd225293354e08fd408c35c441a649e24d5aa73', htmlFor: this.textareaId, class: "fb-label" }, this.label, this.required && h("span", { key: 'c2ae106aee20a65a91c8b33db38d269a598f900f', class: "required-indicator", "aria-hidden": "true" }, " *"))), h("textarea", { key: '59bf5e4092a549cca31b17280b31702bb245d4c3', id: this.textareaId, rows: this.rows, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, maxLength: this.maxLength, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": describedBy, class: {
                'fb-textarea': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            }, onInput: (e) => {
                const val = e.target.value;
                this.value = val;
                this.fbChange.emit(val);
            }, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }, this.value), h("div", { key: '15c66b58650087db27362fe0568d21cfee66bcf4', class: "fb-textarea-footer" }, hasHelper && (h("div", { key: 'cb4f8bd02565a4e81c9f4e8ff8dddc1a1ace6b35', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.isError && (h("svg", { key: 'b6004e8c352db2a7ef5445815e4ed49f4abda951', "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: '8b8c490bb9fcb8a4231f88f3eb1f4b2b6b7db369', cx: "12", cy: "12", r: "10" }), h("line", { key: '76bcfcb572878cbf26a463ee77a960f3ede1ca77', x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { key: 'bd91ccf081e81c7d516875d451ea952e5904a20c', x1: "12", y1: "16", x2: "12.01", y2: "16" }))), this.helperText)), showCounter && (
        // aria-live="polite" announces the count as the user types
        h("div", { key: '07c712f8bb7f9a47a2aa9be430c1c34d90f9c8f9', id: counterId, class: { 'fb-counter': true, 'fb-counter--limit': charCount >= this.maxLength }, "aria-live": "polite" }, charCount, "/", this.maxLength))))));
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
