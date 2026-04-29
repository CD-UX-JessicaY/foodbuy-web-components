import { h, Host } from "@stencil/core";
import { renderFieldLabel, renderHelperText } from "../../utils/field-helpers";
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
        return (h(Host, { key: 'd4494e36d7dadee8ef5d93fd2fdcf022f70b62fc' }, h("div", { key: '11b6eac0ac6071de8041eb896ee626fcdb238b23', class: "fb-combobox-wrapper" }, renderFieldLabel(this.label, this.required, this.inputId, this.labelId), h("div", { key: 'ced7e117a304055a7da17d4c74a610209c281a51', class: "fb-combobox-container" }, h("div", { key: 'e8c459c74b81d64fccaaa2b61e487f6f88ca1e04', class: {
                'fb-combobox-field': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'is-open': this.open,
            } }, h("span", { key: '85543003465e2df1705571d653de28d41eb9b072', class: "search-icon", "aria-hidden": "true" }, h("svg", { key: '0ed25b269e61468d232f6b3d6b89dede2e48be7a', width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: 'f980031d16e8668698a6c453304d78a37ea1ac71', cx: "11", cy: "11", r: "8" }), h("path", { key: 'a2e73c8c79ee79321df265c768734d2392ffbb13', d: "m21 21-4.35-4.35" }))), h("input", { key: '5539aad77fbca166af2889f9f2efd33f69bc2b2e', id: this.inputId, ref: el => this.inputEl = el, type: "text", role: "combobox", "aria-autocomplete": "list", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.listboxId, "aria-activedescendant": activeOptId, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, "aria-labelledby": this.label ? this.labelId : null, disabled: this.isDisabled, value: this.inputValue, placeholder: this.placeholder, class: "native-input", autoComplete: "off", spellcheck: false, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown }), showClear && (h("button", { key: '22556e42e892806dbbd7175d7039898bbc1e98d7', type: "button", class: "icon-btn clear-btn", "aria-label": "Clear", tabIndex: -1, onMouseDown: e => e.preventDefault(), onClick: this.handleClear }, h("svg", { key: 'ec1f0cd7229e965757d633a710f36e59dd4e7d09', width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '77bf31d6e10ebbb782d9e17f3fd3758d7b3f4307', d: "M18 6L6 18M6 6l12 12" })))), h("span", { key: '4563e3199732bacd78da009c76ef9d8a3c99ce46', class: { 'chevron': true, 'chevron--open': this.open }, "aria-hidden": "true" }, h("svg", { key: '08970c657adf649d4f041b412952df1617baf2a2', width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '2e21457f0667c3de03fe37a8ef750caee48300cc', d: "M6 9l6 6 6-6" })))), this.open && (h("ul", { key: 'cc06b2bf6aee7415bcebc89e5ea60435381159d0', id: this.listboxId, role: "listbox", "aria-label": this.label || 'Options', class: "fb-listbox" }, filtered.length === 0 ? (h("li", { class: "fb-option fb-option--empty", role: "option", "aria-disabled": "true" }, this.noResultsText)) : (filtered.map(opt => {
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
        }))))), renderHelperText(this.helperText, this.helperId, this.isError))));
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
