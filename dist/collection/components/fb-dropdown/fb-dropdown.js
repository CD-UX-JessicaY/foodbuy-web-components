import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbDropdown {
    constructor() {
        this.label = 'Actions';
        this.items = '[]';
        this.disabled = false;
        this.variant = 'secondary';
        this.open = false;
        this.focusedIndex = 0;
        this.handleTriggerKeyDown = (e) => {
            switch (e.key) {
                case 'Enter':
                case ' ':
                case 'ArrowDown':
                    e.preventDefault();
                    if (!this.open)
                        this.openMenu();
                    else {
                        this.focusedIndex = 0;
                        this.focusItem(0);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (!this.open)
                        this.openMenu();
                    else {
                        const last = this.enabledItems.length - 1;
                        this.focusedIndex = last;
                        this.focusItem(last);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
            }
        };
        this.handleMenuKeyDown = (e) => {
            const enabled = this.enabledItems;
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.focusedIndex = (this.focusedIndex + 1) % enabled.length;
                    this.focusItem(this.focusedIndex);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.focusedIndex = (this.focusedIndex - 1 + enabled.length) % enabled.length;
                    this.focusItem(this.focusedIndex);
                    break;
                case 'Home':
                    e.preventDefault();
                    this.focusedIndex = 0;
                    this.focusItem(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.focusedIndex = enabled.length - 1;
                    this.focusItem(enabled.length - 1);
                    break;
                case 'Escape':
                case 'Tab':
                    e.preventDefault();
                    this.close();
                    break;
            }
        };
    }
    connectedCallback() {
        idCounter++;
        this.triggerId = `fb-dropdown-trigger-${idCounter}`;
        this.menuId = `fb-dropdown-menu-${idCounter}`;
    }
    onDocumentClick(e) {
        if (this.open && !this.el.contains(e.target))
            this.close();
    }
    get parsedItems() {
        if (typeof this.items === 'string') {
            try {
                return JSON.parse(this.items);
            }
            catch (_a) {
                return [];
            }
        }
        return this.items;
    }
    get enabledItems() { return this.parsedItems.filter(i => !i.disabled); }
    toggle() {
        this.open ? this.close() : this.openMenu();
    }
    openMenu() {
        if (this.disabled)
            return;
        this.open = true;
        this.focusedIndex = 0;
        requestAnimationFrame(() => this.focusItem(0));
    }
    close() {
        var _a, _b;
        this.open = false;
        (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.triggerId}`)) === null || _b === void 0 ? void 0 : _b.focus();
    }
    select(item) {
        if (item.disabled)
            return;
        this.fbSelect.emit(item.id);
        this.close();
    }
    focusItem(index) {
        var _a, _b;
        const items = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
        (_b = items === null || items === void 0 ? void 0 : items[index]) === null || _b === void 0 ? void 0 : _b.focus();
    }
    render() {
        const items = this.parsedItems;
        return (h(Host, { key: 'ab250ea34bbebc6a08b391fc5476f7932c070e21', style: { position: 'relative', display: 'inline-block' } }, h("button", { key: '9e00e8ff365afe35848082008bb520873a420608', id: this.triggerId, type: "button", "aria-haspopup": "true", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.menuId, disabled: this.disabled, class: { 'fb-trigger': true, [`variant-${this.variant}`]: true }, onClick: () => this.toggle(), onKeyDown: this.handleTriggerKeyDown }, h("slot", { key: '7ffd7fa8e701e4e7ca0c408bf1aad0faa60bd5de', name: "trigger" }, this.label), h("svg", { key: 'dd849c3a308691a15a18ce493c405d7b6f31f627', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round", class: { 'chevron': true, 'chevron--open': this.open } }, h("path", { key: '2a610996ac4798a7ebfb748191653da723428731', d: "M6 9l6 6 6-6" }))), this.open && (h("ul", { key: 'a9be7df1d0c7782cd123d2aedcf59b5f366f9eef', id: this.menuId, role: "menu", "aria-label": this.label, class: "fb-menu", onKeyDown: this.handleMenuKeyDown }, items.map(item => (h("li", { key: item.id, role: "none" }, h("button", { type: "button", role: "menuitem", "aria-disabled": item.disabled ? 'true' : null, class: { 'fb-menuitem': true, 'danger': !!item.danger, 'disabled': !!item.disabled }, tabindex: item.disabled ? -1 : 0, onClick: () => this.select(item) }, item.label))))))));
    }
    static get is() { return "fb-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-dropdown.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-dropdown.css"]
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
                "defaultValue": "'Actions'"
            },
            "items": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "DropdownItem[] | string",
                    "resolved": "DropdownItem[] | string",
                    "references": {
                        "DropdownItem": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-dropdown/fb-dropdown.tsx",
                            "id": "src/components/fb-dropdown/fb-dropdown.tsx::DropdownItem"
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
                "attribute": "items",
                "defaultValue": "'[]'"
            },
            "disabled": {
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
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'default' | 'secondary' | 'ghost'",
                    "resolved": "\"default\" | \"ghost\" | \"secondary\"",
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
                "attribute": "variant",
                "defaultValue": "'secondary'"
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
                "method": "fbSelect",
                "name": "fbSelect",
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
