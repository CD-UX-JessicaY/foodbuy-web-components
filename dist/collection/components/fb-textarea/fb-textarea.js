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
        return (h(Host, { key: '3c90c9e88e4e7352afa50a83227175e15b8db8a4' }, h("div", { key: 'c7bafcf4a3a5cf01578563c74e355e945e31f1d6', class: "fb-textarea-wrapper" }, this.label && (h("label", { key: 'd199cb85ce98319ab940214929beb4b7e3ee7113', htmlFor: this.textareaId, class: "fb-label" }, this.label, this.required && h("span", { key: 'cade17ff70adba3a5a325a61a731c6ac8c18bc2f', class: "required-indicator", "aria-hidden": "true" }, " *"))), h("textarea", { key: '0da0c1d078f6f0fa6498e2379d98ada9c96460b1', id: this.textareaId, rows: this.rows, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, maxLength: this.maxLength, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": describedBy, class: {
                'fb-textarea': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            }, onInput: (e) => {
                const val = e.target.value;
                this.value = val;
                this.fbChange.emit(val);
            }, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }, this.value), h("div", { key: 'c6cc8bf1402ba22a91ed4906a99baf00b543b33a', class: "fb-textarea-footer" }, hasHelper && (h("div", { key: '1d72dfeff7c3bcd28ce704612863a6dbbb09c5e2', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.isError && (h("svg", { key: '36a97c00944898c06c1d55618c640bfeff63b787', "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: 'f929e93093e5b93d0a9f937dd53d60afa232082b', cx: "12", cy: "12", r: "10" }), h("line", { key: 'f245222feaf6ce91d1c2042230b5b0afd7d7ab93', x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { key: 'c60224d9539166c77b51e003511b0f5a0d70f241', x1: "12", y1: "16", x2: "12.01", y2: "16" }))), this.helperText)), showCounter && (
        // aria-live="polite" announces the count as the user types
        h("div", { key: '64ca7f550fe1602104d62eec027ef9d1813aacde', id: counterId, class: { 'fb-counter': true, 'fb-counter--limit': charCount >= this.maxLength }, "aria-live": "polite" }, charCount, "/", this.maxLength))))));
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
