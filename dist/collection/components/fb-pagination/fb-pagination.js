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
        return (h(Host, { key: '01724bfbca19d482c5066aeb6d5922fc48d78c33' }, h("nav", { key: '94f684d61dbd2131fc0949ccee41b2d34745612b', "aria-label": this.label, class: "fb-pagination" }, h("button", { key: 'd12c702f56a293bcdc1d9dc55584b40fc5cefc42', type: "button", class: "page-btn nav-btn", "aria-label": "Go to previous page", disabled: isFirst, "aria-disabled": isFirst ? 'true' : null, onClick: () => this.go(this.currentPage - 1) }, h("svg", { key: 'f8ff6b772362c52f2cb1fb08b9859f7817e93460', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: 'e4c65a53d3bf73b6d552116e712523322049c785', d: "M15 18l-6-6 6-6" }))), pages.map((page, i) => page === '...'
            ? h("span", { key: `ellipsis-${i}`, class: "ellipsis", "aria-hidden": "true" }, "\u2026")
            : (h("button", { key: page, type: "button", class: { 'page-btn': true, 'active': page === this.currentPage }, "aria-label": `Go to page ${page}`, "aria-current": page === this.currentPage ? 'page' : null, onClick: () => this.go(page) }, page))), h("button", { key: '4286efc6753d06a773267265bab8cd0d20204bec', type: "button", class: "page-btn nav-btn", "aria-label": "Go to next page", disabled: isLast, "aria-disabled": isLast ? 'true' : null, onClick: () => this.go(this.currentPage + 1) }, h("svg", { key: 'cbf63c02e6a4b996e6face9d3d828e7532b323e9', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '9b1e717c26b6157497a4667d3a9f18d0908159c8', d: "M9 18l6-6-6-6" }))))));
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
