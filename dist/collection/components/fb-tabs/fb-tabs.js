import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbTabs {
    constructor() {
        this.tabs = '[]';
        this.activeTab = '';
        this.variant = 'underline';
        this.size = 'default';
        this.fullWidth = false;
        this.label = 'Page sections';
        this._activeTab = '';
        this.handleKeyDown = (e, currentIndex) => {
            var _a, _b;
            const enabled = this.parsedTabs.filter(t => !t.disabled);
            const pos = enabled.findIndex(t => { var _a; return t.id === ((_a = this.parsedTabs[currentIndex]) === null || _a === void 0 ? void 0 : _a.id); });
            let target;
            switch (e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    target = enabled[(pos + 1) % enabled.length];
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    target = enabled[(pos - 1 + enabled.length) % enabled.length];
                    break;
                case 'Home':
                    e.preventDefault();
                    target = enabled[0];
                    break;
                case 'End':
                    e.preventDefault();
                    target = enabled[enabled.length - 1];
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.activate(this.parsedTabs[currentIndex].id);
                    return;
            }
            if (target) {
                this.activate(target.id);
                // Move DOM focus to the newly active tab button
                const tabEl = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`#${this.tabId(target.id)}`);
                tabEl === null || tabEl === void 0 ? void 0 : tabEl.focus();
            }
        };
    }
    connectedCallback() {
        var _a;
        idCounter++;
        this.baseId = `fb-tabs-${idCounter}`;
        this._activeTab = this.activeTab || ((_a = this.parsedTabs.find(t => !t.disabled)) === null || _a === void 0 ? void 0 : _a.id) || '';
    }
    get parsedTabs() {
        if (typeof this.tabs === 'string') {
            try {
                return JSON.parse(this.tabs);
            }
            catch (_a) {
                return [];
            }
        }
        return this.tabs;
    }
    tabId(id) { return `${this.baseId}-tab-${id}`; }
    panelId(id) { return `${this.baseId}-panel-${id}`; }
    activate(id) {
        this._activeTab = id;
        this.fbTabChange.emit(id);
    }
    render() {
        var _a;
        const tabs = this.parsedTabs;
        const active = this._activeTab || ((_a = tabs.find(t => !t.disabled)) === null || _a === void 0 ? void 0 : _a.id);
        return (h(Host, { key: 'b544a22e617b812c08fc83ce4c7fba278344a4b2', ref: (el) => this.el = el }, h("div", { key: '95fb5034d55ed26b526d434e40c42b314132b036', role: "tablist", "aria-label": this.label, class: {
                'fb-tablist': true,
                [`variant-${this.variant}`]: true,
                'full-width': this.fullWidth,
            } }, tabs.map((tab, index) => {
            const isActive = tab.id === active;
            const isDisabled = !!tab.disabled;
            return (h("button", { key: tab.id, id: this.tabId(tab.id), role: "tab", "aria-selected": isActive ? 'true' : 'false', "aria-controls": this.panelId(tab.id), "aria-disabled": isDisabled ? 'true' : null, tabindex: isActive ? 0 : -1, disabled: isDisabled, class: {
                    'fb-tab': true,
                    [`size-${this.size}`]: true,
                    'active': isActive,
                    'disabled': isDisabled,
                    'full-width': this.fullWidth,
                }, onClick: () => !isDisabled && this.activate(tab.id), onKeyDown: (e) => !isDisabled && this.handleKeyDown(e, index) }, tab.label));
        })), tabs.map((tab) => (h("div", { key: tab.id, id: this.panelId(tab.id), role: "tabpanel", "aria-labelledby": this.tabId(tab.id), tabindex: 0, hidden: tab.id !== active, class: "fb-tabpanel" }, h("slot", { name: tab.id }))))));
    }
    static get is() { return "fb-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-tabs.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-tabs.css"]
        };
    }
    static get properties() {
        return {
            "tabs": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TabItem[] | string",
                    "resolved": "TabItem[] | string",
                    "references": {
                        "TabItem": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-tabs/fb-tabs.tsx",
                            "id": "src/components/fb-tabs/fb-tabs.tsx::TabItem"
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
                "attribute": "tabs",
                "defaultValue": "'[]'"
            },
            "activeTab": {
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
                "attribute": "active-tab",
                "defaultValue": "''"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TabsVariant",
                    "resolved": "\"pill\" | \"underline\"",
                    "references": {
                        "TabsVariant": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-tabs/fb-tabs.tsx",
                            "id": "src/components/fb-tabs/fb-tabs.tsx::TabsVariant"
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
                "attribute": "variant",
                "defaultValue": "'underline'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TabsSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "TabsSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-tabs/fb-tabs.tsx",
                            "id": "src/components/fb-tabs/fb-tabs.tsx::TabsSize"
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
            "fullWidth": {
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
                "attribute": "full-width",
                "defaultValue": "false"
            },
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
                "defaultValue": "'Page sections'"
            }
        };
    }
    static get states() {
        return {
            "_activeTab": {}
        };
    }
    static get events() {
        return [{
                "method": "fbTabChange",
                "name": "fbTabChange",
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
}
