import { h, Host } from "@stencil/core";
import { renderFieldLabel, renderHelperText } from "../../utils/field-helpers";
let idCounter = 0;
export class FbSelect {
    constructor() {
        this.label = '';
        this.options = '[]';
        this.value = '';
        this.placeholder = 'Select an option';
        this.state = 'default';
        this.size = 'default';
        this.helperText = '';
        this.required = false;
        this.open = false;
        this.focusedIndex = -1;
        this.handleTriggerKeyDown = (e) => {
            const opts = this.parsedOptions.filter(o => !o.disabled);
            switch (e.key) {
                case 'Enter':
                case ' ':
                case 'ArrowDown':
                    e.preventDefault();
                    if (!this.open) {
                        this.open_();
                    }
                    else if (this.focusedIndex < opts.length - 1) {
                        this.focusedIndex++;
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (this.open && this.focusedIndex > 0) {
                        this.focusedIndex--;
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    if (this.open) {
                        this.focusedIndex = 0;
                    }
                    break;
                case 'End':
                    e.preventDefault();
                    if (this.open) {
                        this.focusedIndex = opts.length - 1;
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
                case 'Tab':
                    if (this.open) {
                        this.close();
                    }
                    break;
                default:
                    // Type-ahead: jump to first option starting with pressed character
                    if (e.key.length === 1) {
                        const char = e.key.toLowerCase();
                        const idx = opts.findIndex((o, i) => i > this.focusedIndex && o.label.toLowerCase().startsWith(char));
                        const fallback = opts.findIndex(o => o.label.toLowerCase().startsWith(char));
                        const target = idx >= 0 ? idx : fallback;
                        if (target >= 0) {
                            this.focusedIndex = target;
                            if (!this.open)
                                this.open_();
                        }
                    }
            }
        };
        this.handleOptionKeyDown = (e, opt) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.selectOption(opt);
            }
        };
    }
    connectedCallback() {
        idCounter++;
        this.triggerId = `fb-select-trigger-${idCounter}`;
        this.listboxId = `fb-select-listbox-${idCounter}`;
        this.helperId = `fb-select-helper-${idCounter}`;
        this.labelId = `fb-select-label-${idCounter}`;
    }
    // Close on outside click
    onDocumentClick(e) {
        if (this.open && !this.el.contains(e.target)) {
            this.close();
        }
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
    get isDisabled() { return this.state === 'disabled'; }
    get isError() { return this.state === 'error'; }
    get selectedOption() { return this.parsedOptions.find(o => o.value === this.value); }
    open_() {
        if (this.isDisabled)
            return;
        this.open = true;
        // Focus the currently selected option, or the first one
        const opts = this.parsedOptions.filter(o => !o.disabled);
        const selIdx = opts.findIndex(o => o.value === this.value);
        this.focusedIndex = selIdx >= 0 ? selIdx : 0;
    }
    close() {
        var _a, _b;
        this.open = false;
        this.focusedIndex = -1;
        // Return focus to trigger
        (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.triggerId}`)) === null || _b === void 0 ? void 0 : _b.focus();
    }
    selectOption(opt) {
        if (opt.disabled)
            return;
        this.value = opt.value;
        this.fbChange.emit(opt.value);
        this.close();
    }
    render() {
        var _a;
        const opts = this.parsedOptions;
        const enabledOpts = opts.filter(o => !o.disabled);
        const hasHelper = !!this.helperText;
        const activeId = this.open && this.focusedIndex >= 0
            ? `${this.listboxId}-opt-${(_a = enabledOpts[this.focusedIndex]) === null || _a === void 0 ? void 0 : _a.value}`
            : undefined;
        return (h(Host, { key: '3bbe86ccdf4523d2ec3f29961829d4af297698c8' }, h("div", { key: 'e703ac3823f68718dd1691f86f10994855f443cb', class: "fb-select-wrapper", style: { fontFamily: 'var(--font-family-primary)' } }, renderFieldLabel(this.label, this.required, this.triggerId, this.labelId), h("div", { key: '59a87b49af3e1c085643cda07aa04589e9bc1359', class: "fb-select-container", style: { position: 'relative' } }, h("button", { key: '63530fc441ae62f574ae99522f00c76e658f0830', id: this.triggerId, type: "button", role: "combobox", "aria-haspopup": "listbox", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.listboxId, "aria-labelledby": this.label ? `${this.labelId} ${this.triggerId}` : null, "aria-activedescendant": activeId, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, disabled: this.isDisabled, class: {
                'fb-select-trigger': true,
                [`size-${this.size}`]: true,
                'open': this.open,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'has-value': !!this.selectedOption,
            }, onClick: () => this.open ? this.close() : this.open_(), onKeyDown: this.handleTriggerKeyDown }, h("span", { key: '057b181852a367e16e0b54637f33f07f89dabb0e', class: "trigger-text" }, this.selectedOption ? this.selectedOption.label : this.placeholder), h("span", { key: 'd5e4fd198c621a4f5de7aa64ab5ffb8200412686', "aria-hidden": "true", class: { 'chevron': true, 'chevron--open': this.open } }, h("svg", { key: '370a90ea05d8daf05cc1e0f1d313e815813fbab4', width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: 'f54b269df6dd75c29a0962dfef4f1b2447eeb98b', d: "M6 9l6 6 6-6" })))), this.open && (h("ul", { key: '1435dac6e64f743254d8cfbfb6a73180a03c605f', id: this.listboxId, role: "listbox", "aria-label": this.label || 'Options', class: "fb-listbox" }, opts.map((opt) => {
            var _a;
            const isSelected = this.value === opt.value;
            const isFocused = ((_a = enabledOpts[this.focusedIndex]) === null || _a === void 0 ? void 0 : _a.value) === opt.value;
            const optionId = `${this.listboxId}-opt-${opt.value}`;
            return (h("li", { key: opt.value, id: optionId, role: "option", "aria-selected": isSelected ? 'true' : 'false', "aria-disabled": opt.disabled ? 'true' : null, class: {
                    'fb-option': true,
                    'selected': isSelected,
                    'focused': isFocused,
                    'disabled': !!opt.disabled,
                }, onClick: () => this.selectOption(opt), onKeyDown: (e) => this.handleOptionKeyDown(e, opt) }, h("span", null, opt.label), isSelected && (h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M20 6L9 17l-5-5" })))));
        })))), renderHelperText(this.helperText, this.helperId, this.isError))));
    }
    static get is() { return "fb-select"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-select.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-select.css"]
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
                    "text": ""
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
                    "original": "SelectOption[] | string",
                    "resolved": "SelectOption[] | string",
                    "references": {
                        "SelectOption": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-select/fb-select.tsx",
                            "id": "src/components/fb-select/fb-select.tsx::SelectOption"
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
                "defaultValue": "'Select an option'"
            },
            "state": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "SelectState",
                    "resolved": "\"default\" | \"disabled\" | \"error\"",
                    "references": {
                        "SelectState": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-select/fb-select.tsx",
                            "id": "src/components/fb-select/fb-select.tsx::SelectState"
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
                    "original": "SelectSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "SelectSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-select/fb-select.tsx",
                            "id": "src/components/fb-select/fb-select.tsx::SelectSize"
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
            }
        };
    }
    static get states() {
        return {
            "open": {},
            "focusedIndex": {}
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
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onDocumentClick",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
