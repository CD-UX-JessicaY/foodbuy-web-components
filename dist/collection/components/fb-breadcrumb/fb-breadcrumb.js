import { h, Host } from "@stencil/core";
export class FbBreadcrumb {
    constructor() {
        this.items = '[]';
        this.label = 'Breadcrumb';
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
    render() {
        const items = this.parsedItems;
        return (h(Host, { key: 'aba6d80dd617271114973d282f123a46cf62b875' }, h("nav", { key: 'd6ec80064cf7f83d4f180ba3e0c51416246d4a21', "aria-label": this.label, class: "fb-breadcrumb" }, h("ol", { key: '5570687f17e3f875facb6239c3fa057a3c9244ba', class: "breadcrumb-list" }, items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (h("li", { key: index, class: "breadcrumb-item" }, isLast ? (h("span", { "aria-current": "page", class: "breadcrumb-current" }, item.label)) : (h("a", { href: item.href || '#', class: "breadcrumb-link" }, item.label)), !isLast && (h("span", { class: "breadcrumb-separator", "aria-hidden": "true" }, "/"))));
        })))));
    }
    static get is() { return "fb-breadcrumb"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-breadcrumb.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-breadcrumb.css"]
        };
    }
    static get properties() {
        return {
            "items": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "BreadcrumbItem[] | string",
                    "resolved": "BreadcrumbItem[] | string",
                    "references": {
                        "BreadcrumbItem": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-breadcrumb/fb-breadcrumb.tsx",
                            "id": "src/components/fb-breadcrumb/fb-breadcrumb.tsx::BreadcrumbItem"
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
                "defaultValue": "'Breadcrumb'"
            }
        };
    }
}
