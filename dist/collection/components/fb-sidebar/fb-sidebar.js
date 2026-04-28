import { h, Host } from "@stencil/core";
let idCounter = 0;
export class FbSidebar {
    constructor() {
        this.items = '[]';
        this.label = 'Main navigation';
        this.activeId = '';
        this.collapsed = false;
        this.expandedIds = new Set();
    }
    connectedCallback() {
        idCounter++;
        this._instanceId = idCounter;
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
    toggleExpand(id) {
        const next = new Set(this.expandedIds);
        next.has(id) ? next.delete(id) : next.add(id);
        this.expandedIds = next;
    }
    navigate(item) {
        if (item.disabled)
            return;
        this.activeId = item.id;
        this.fbNavigate.emit(item.id);
    }
    panelId(id) { return `fb-sidebar-panel-${this._instanceId}-${id}`; }
    triggerId(id) { return `fb-sidebar-trigger-${this._instanceId}-${id}`; }
    renderItems(items, depth = 0) {
        return items.map(item => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = this.expandedIds.has(item.id);
            const isActive = this.activeId === item.id;
            return (h("li", { key: item.id, class: "fb-sidebar__item" }, hasChildren ? (h("div", null, h("button", { id: this.triggerId(item.id), type: "button", "aria-expanded": isExpanded ? 'true' : 'false', "aria-controls": this.panelId(item.id), disabled: item.disabled, class: {
                    'fb-sidebar__link': true,
                    'fb-sidebar__link--group': true,
                    [`fb-sidebar__link--depth-${depth}`]: true,
                    'fb-sidebar__link--disabled': !!item.disabled,
                }, onClick: () => this.toggleExpand(item.id) }, item.icon && h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && h("span", { class: "fb-sidebar__label" }, item.label), !this.collapsed && (h("svg", { "aria-hidden": "true", class: { 'fb-sidebar__chevron': true, 'fb-sidebar__chevron--open': isExpanded }, width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M6 9l6 6 6-6" })))), isExpanded && (h("ul", { id: this.panelId(item.id), role: "list", class: "fb-sidebar__submenu" }, this.renderItems(item.children, depth + 1))))) : (item.href
                ? (h("a", { href: item.href, "aria-current": isActive ? 'page' : null, "aria-disabled": item.disabled ? 'true' : null, class: {
                        'fb-sidebar__link': true,
                        'fb-sidebar__link--active': isActive,
                        [`fb-sidebar__link--depth-${depth}`]: true,
                        'fb-sidebar__link--disabled': !!item.disabled,
                    }, onClick: (e) => { e.preventDefault(); this.navigate(item); } }, item.icon && h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && h("span", { class: "fb-sidebar__label" }, item.label)))
                : (h("button", { type: "button", "aria-current": isActive ? 'page' : null, disabled: item.disabled, class: {
                        'fb-sidebar__link': true,
                        'fb-sidebar__link--active': isActive,
                        [`fb-sidebar__link--depth-${depth}`]: true,
                        'fb-sidebar__link--disabled': !!item.disabled,
                    }, onClick: () => this.navigate(item) }, item.icon && h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && h("span", { class: "fb-sidebar__label" }, item.label))))));
        });
    }
    render() {
        const items = this.parsedItems;
        return (h(Host, { key: '54f6c21a7f81ab5f294c1a62abd19eaabad4c055' }, h("nav", { key: '337a5dfa47fe0f69c7dc8175e40091b2184b472f', "aria-label": this.label, class: { 'fb-sidebar': true, 'fb-sidebar--collapsed': this.collapsed } }, h("ul", { key: '90b2b06002effbf021f97a9690347c3d7e538a79', role: "list", class: "fb-sidebar__list" }, this.renderItems(items)), h("slot", { key: '68d7c4d033ed2a4067e23f93c2182aaa17848436', name: "footer" }))));
    }
    static get is() { return "fb-sidebar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-sidebar.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-sidebar.css"]
        };
    }
    static get properties() {
        return {
            "items": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "SidebarItem[] | string",
                    "resolved": "SidebarItem[] | string",
                    "references": {
                        "SidebarItem": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-sidebar/fb-sidebar.tsx",
                            "id": "src/components/fb-sidebar/fb-sidebar.tsx::SidebarItem"
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
                "defaultValue": "'Main navigation'"
            },
            "activeId": {
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
                "attribute": "active-id",
                "defaultValue": "''"
            },
            "collapsed": {
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
                "attribute": "collapsed",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "expandedIds": {}
        };
    }
    static get events() {
        return [{
                "method": "fbNavigate",
                "name": "fbNavigate",
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
