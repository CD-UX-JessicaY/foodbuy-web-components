import { h, Host } from "@stencil/core";
export class FbPagination {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 1;
        this.label = 'Pagination';
    }
    go(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage)
            return;
        this.currentPage = page;
        this.fbPageChange.emit(page);
    }
    getPages() {
        const total = this.totalPages;
        const cur = this.currentPage;
        if (total <= 7)
            return Array.from({ length: total }, (_, i) => i + 1);
        const pages = [1];
        if (cur > 3)
            pages.push('...');
        for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++)
            pages.push(i);
        if (cur < total - 2)
            pages.push('...');
        pages.push(total);
        return pages;
    }
    render() {
        const pages = this.getPages();
        const isFirst = this.currentPage === 1;
        const isLast = this.currentPage === this.totalPages;
        return (h(Host, { key: '17247fb2c383fdf4fec913604ea4dcae9d9d4c89' }, h("nav", { key: 'f49a89ea250d7fee3332c58691b2d03166301769', "aria-label": this.label, class: "fb-pagination" }, h("button", { key: '696bc555b6dffd5aca62126fa1663481fd022ce7', type: "button", class: "page-btn nav-btn", "aria-label": "Go to previous page", disabled: isFirst, "aria-disabled": isFirst ? 'true' : null, onClick: () => this.go(this.currentPage - 1) }, h("svg", { key: '1bfd4890fc18deb8cd3c1fddec042aee6f799e45', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '1b4512f0c1ca85f0a23594f8105450afe2462c6b', d: "M15 18l-6-6 6-6" }))), pages.map((page, i) => page === '...'
            ? h("span", { key: `ellipsis-${i}`, class: "ellipsis", "aria-hidden": "true" }, "\u2026")
            : (h("button", { key: page, type: "button", class: { 'page-btn': true, 'active': page === this.currentPage }, "aria-label": `Go to page ${page}`, "aria-current": page === this.currentPage ? 'page' : null, onClick: () => this.go(page) }, page))), h("button", { key: 'c13ddf981b05422ca2402c43e33b1a62db6cc010', type: "button", class: "page-btn nav-btn", "aria-label": "Go to next page", disabled: isLast, "aria-disabled": isLast ? 'true' : null, onClick: () => this.go(this.currentPage + 1) }, h("svg", { key: '3234c89a68bdd4bd25a9762cf23e980ebfd432c1', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: 'dc06e763c32ee37ef636eb68bab9428ee39229cf', d: "M9 18l6-6-6-6" }))))));
    }
    static get is() { return "fb-pagination"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-pagination.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-pagination.css"]
        };
    }
    static get properties() {
        return {
            "currentPage": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "attribute": "current-page",
                "defaultValue": "1"
            },
            "totalPages": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "total-pages",
                "defaultValue": "1"
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
                "defaultValue": "'Pagination'"
            }
        };
    }
    static get events() {
        return [{
                "method": "fbPageChange",
                "name": "fbPageChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                }
            }];
    }
}
