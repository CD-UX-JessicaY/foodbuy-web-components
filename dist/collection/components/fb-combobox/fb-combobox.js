import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbCombobox {
    constructor() {
        /** Field label */
        this.label = '';
        /** JSON array of { value, label, disabled? } */
        this.options = '[]';
        /** Currently selected value */
        this.value = '';
        this.placeholder = 'Search or select…';
        this.state = 'default';
        this.size = 'default';
        this.helperText = '';
        this.required = false;
        /** Show ✕ clear button when a value is set */
        this.clearable = false;
        /**
         * When true the user may type a value not in the options list.
         * fbChange fires with the raw typed string on blur/Enter.
         */
        this.freeform = false;
        /** Message shown when no options match the filter */
        this.noResultsText = 'No results';
        this.open = false;
        this.inputValue = '';
        this.focusedIndex = -1;
        // ── Event handlers ────────────────────────────────────────────────────
        this.handleInput = (e) => {
            const val = e.target.value;
            this.inputValue = val;
            this.open = true;
            this.focusedIndex = -1;
            this.fbInput.emit(val);
        };
        this.handleFocus = () => {
            if (!this.isDisabled)
                this.openDropdown();
        };
        this.handleBlur = () => {
            // Delay so option onClick fires before blur closes the list
            setTimeout(() => {
                if (!this.open)
                    return;
                this.commitOrReset();
                this.closeDropdown();
            }, 150);
        };
        this.handleKeyDown = (e) => {
            const opts = this.filteredOptions.filter(o => !o.disabled);
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (!this.open) {
                        this.openDropdown();
                        return;
                    }
                    this.focusedIndex = Math.min(this.focusedIndex + 1, opts.length - 1);
                    this.scrollOptionIntoView();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (this.focusedIndex > 0) {
                        this.focusedIndex--;
                        this.scrollOptionIntoView();
                    }
                    break;
                case 'Enter':
                    if (this.open && this.focusedIndex >= 0 && opts[this.focusedIndex]) {
                        e.preventDefault();
                        this.selectOption(opts[this.focusedIndex]);
                    }
                    else if (this.freeform && this.inputValue) {
                        e.preventDefault();
                        this.commitOrReset();
                        this.closeDropdown();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    // Restore display text to committed value without firing change
                    const opt = this.parsedOptions.find(o => o.value === this.value);
                    this.inputValue = opt ? opt.label : '';
                    this.closeDropdown();
                    break;
                case 'Tab':
                    if (this.open) {
                        this.commitOrReset();
                        this.closeDropdown();
                    }
                    break;
            }
        };
        this.handleClear = (e) => {
            var _a;
            e.stopPropagation();
            this.value = '';
            this.inputValue = '';
            this.fbChange.emit('');
            this.fbClear.emit();
            (_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.focus();
        };
    }
    connectedCallback() {
        idCounter++;
        this.inputId = `fb-combobox-input-${idCounter}`;
        this.listboxId = `fb-combobox-lb-${idCounter}`;
        this.helperId = `fb-combobox-helper-${idCounter}`;
        this.labelId = `fb-combobox-label-${idCounter}`;
        // Initialise display text from value
        const opt = this.parsedOptions.find(o => o.value === this.value);
        this.inputValue = opt ? opt.label : (this.freeform ? this.value : '');
    }
    onValueChange(newVal) {
        const opt = this.parsedOptions.find(o => o.value === newVal);
        this.inputValue = opt ? opt.label : (this.freeform ? newVal : '');
    }
    // Close on outside click
    onDocumentClick(e) {
        if (this.open && !this.el.contains(e.target)) {
            this.commitOrReset();
            this.closeDropdown();
        }
    }
    // ── Helpers ──────────────────────────────────────────────────────────
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
    get filteredOptions() {
        const q = this.inputValue.toLowerCase().trim();
        if (!q)
            return this.parsedOptions;
        return this.parsedOptions.filter(o => o.label.toLowerCase().includes(q));
    }
    get isDisabled() { return this.state === 'disabled'; }
    get isError() { return this.state === 'error'; }
    get hasValue() { return !!this.value || (this.freeform && !!this.inputValue); }
    // ── Dropdown control ─────────────────────────────────────────────────
    openDropdown() {
        if (this.isDisabled)
            return;
        this.open = true;
        this.focusedIndex = -1;
    }
    closeDropdown() {
        this.open = false;
        this.focusedIndex = -1;
    }
    commitOrReset() {
        if (this.freeform) {
            if (this.inputValue !== this.value) {
                this.value = this.inputValue;
                this.fbChange.emit(this.inputValue);
            }
        }
        else {
            // Reset display text to current committed value
            const opt = this.parsedOptions.find(o => o.value === this.value);
            this.inputValue = opt ? opt.label : '';
        }
    }
    selectOption(opt) {
        var _a;
        if (opt.disabled)
            return;
        this.value = opt.value;
        this.inputValue = opt.label;
        this.fbChange.emit(opt.value);
        this.closeDropdown();
        (_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    scrollOptionIntoView() {
        // Wait for render cycle then scroll focused option into view
        requestAnimationFrame(() => {
            var _a;
            const li = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-option.focused');
            li === null || li === void 0 ? void 0 : li.scrollIntoView({ block: 'nearest' });
        });
    }
    // ── Render ────────────────────────────────────────────────────────────
    render() {
        const filtered = this.filteredOptions;
        const enabledFiltered = filtered.filter(o => !o.disabled);
        const hasHelper = !!this.helperText;
        const showClear = this.clearable && this.hasValue && !this.isDisabled;
        const activeOptId = this.open && this.focusedIndex >= 0 && enabledFiltered[this.focusedIndex]
            ? `${this.listboxId}-opt-${enabledFiltered[this.focusedIndex].value}`
            : undefined;
        return (h(Host, { key: '866d5ee08d1502a41cf92f8be4bf7559c53b72da' }, h("div", { key: 'c3a62ebb935262903181b1693bce04e350b53031', class: "fb-combobox-wrapper" }, this.label && (h("label", { key: 'd862739571bff95c73ea39b3d109e57e0d3c41fd', id: this.labelId, htmlFor: this.inputId, class: "fb-label" }, this.label, this.required && h("span", { key: 'f8cea87ba331362c171852f1ed66a1619b5dade4', class: "required-indicator", "aria-hidden": "true" }, " *"))), h("div", { key: '56d2edc25ef84ad5b8791581bd64928faa0e4114', class: "fb-combobox-container" }, h("div", { key: '2d27edb6b1676f37910a5b32d12fac8afdf3e685', class: {
                'fb-combobox-field': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'is-open': this.open,
            } }, h("span", { key: '0265e01a1790536f1db5de01d467e5a7283c0e2b', class: "search-icon", "aria-hidden": "true" }, h("svg", { key: 'eabebee46985bfa8466d918dfe9d35f3d0160b63', width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: '4df48179d7917d8c4b987f88fa58a2c4f9da0d71', cx: "11", cy: "11", r: "8" }), h("path", { key: 'd5acd6d9a06c161a70b3e830f4c3f33766c10592', d: "m21 21-4.35-4.35" }))), h("input", { key: '5f5d84e85e8710329e2caccf7d6776934b41fbdb', id: this.inputId, ref: el => this.inputEl = el, type: "text", role: "combobox", "aria-autocomplete": "list", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.listboxId, "aria-activedescendant": activeOptId, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, "aria-labelledby": this.label ? this.labelId : null, disabled: this.isDisabled, value: this.inputValue, placeholder: this.placeholder, class: "native-input", autoComplete: "off", spellcheck: false, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown }), showClear && (h("button", { key: 'fcca61d8a7e5ed95eba8df07233feed29f3afdac', type: "button", class: "icon-btn clear-btn", "aria-label": "Clear", tabIndex: -1, onMouseDown: e => e.preventDefault(), onClick: this.handleClear }, h("svg", { key: '6ffadfdc3a8ec00630ae63399946525016c0f8a5', width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '878e87e9381be3731793849477ec5b613f226bd9', d: "M18 6L6 18M6 6l12 12" })))), h("span", { key: '5134be63aebe581ca51a6d7784b075060cf05855', class: { 'chevron': true, 'chevron--open': this.open }, "aria-hidden": "true" }, h("svg", { key: '87eecafe1c913b1916d491f9e2eb166dc1eaf6fd', width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '7d2cef98daa145d44bc4ccb3eb246cf1bb7165b0', d: "M6 9l6 6 6-6" })))), this.open && (h("ul", { key: '5de9950998689be605afa08410c9a40d1afdc71b', id: this.listboxId, role: "listbox", "aria-label": this.label || 'Options', class: "fb-listbox" }, filtered.length === 0 ? (h("li", { class: "fb-option fb-option--empty", role: "option", "aria-disabled": "true" }, this.noResultsText)) : (filtered.map(opt => {
            var _a;
            const isSelected = this.value === opt.value;
            const isFocused = ((_a = enabledFiltered[this.focusedIndex]) === null || _a === void 0 ? void 0 : _a.value) === opt.value;
            const optId = `${this.listboxId}-opt-${opt.value}`;
            return (h("li", { key: opt.value, id: optId, role: "option", "aria-selected": isSelected ? 'true' : 'false', "aria-disabled": opt.disabled ? 'true' : null, class: {
                    'fb-option': true,
                    'selected': isSelected,
                    'focused': isFocused,
                    'disabled': !!opt.disabled,
                }, onMouseDown: e => e.preventDefault(), onClick: () => this.selectOption(opt) }, h("span", { class: "option-label" }, opt.label), isSelected && (h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M20 6L9 17l-5-5" })))));
        }))))), hasHelper && (h("div", { key: '6c6ec25148a231e99c4680d6957e34fbaf2a9b21', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.helperText)))));
    }
    static get is() { return "fb-combobox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-combobox.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-combobox.css"]
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
                    "text": "Field label"
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
                    "original": "ComboboxOption[] | string",
                    "resolved": "ComboboxOption[] | string",
                    "references": {
                        "ComboboxOption": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-combobox/fb-combobox.tsx",
                            "id": "src/components/fb-combobox/fb-combobox.tsx::ComboboxOption"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "JSON array of { value, label, disabled? }"
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
                    "text": "Currently selected value"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
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
                "defaultValue": "'Search or select\u2026'"
            },
            "state": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ComboboxState",
                    "resolved": "\"default\" | \"disabled\" | \"error\"",
                    "references": {
                        "ComboboxState": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-combobox/fb-combobox.tsx",
                            "id": "src/components/fb-combobox/fb-combobox.tsx::ComboboxState"
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
                    "original": "ComboboxSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "ComboboxSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-combobox/fb-combobox.tsx",
                            "id": "src/components/fb-combobox/fb-combobox.tsx::ComboboxSize"
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
                    "text": "Show \u2715 clear button when a value is set"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "clearable",
                "defaultValue": "false"
            },
            "freeform": {
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
                    "text": "When true the user may type a value not in the options list.\nfbChange fires with the raw typed string on blur/Enter."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "freeform",
                "defaultValue": "false"
            },
            "noResultsText": {
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
                    "text": "Message shown when no options match the filter"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "no-results-text",
                "defaultValue": "'No results'"
            }
        };
    }
    static get states() {
        return {
            "open": {},
            "inputValue": {},
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
                    "text": "Fires when the user selects an option (or commits a freeform value)"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "fbInput",
                "name": "fbInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires on every keystroke"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "fbClear",
                "name": "fbClear",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fires when the field is cleared"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "onValueChange"
            }];
    }
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
