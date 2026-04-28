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
        return (h(Host, { key: '87ba9dd4bf93fc3af0b0fa4d077f83e81e77f2f3' }, h("nav", { key: '1ff30ee84f21f2150f1ed6b2ec1dca8fdcf7c419', "aria-label": this.label, class: "fb-pagination" }, h("button", { key: 'f01a97192bf065d4baf210dea810680acde6da13', type: "button", class: "page-btn nav-btn", "aria-label": "Go to previous page", disabled: isFirst, "aria-disabled": isFirst ? 'true' : null, onClick: () => this.go(this.currentPage - 1) }, h("svg", { key: 'b2cb676d53945e0e441c1a74e6cc49084a240949', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '14ac7e2c431a55b16c82ed7d97c76ffad565410a', d: "M15 18l-6-6 6-6" }))), pages.map((page, i) => page === '...'
            ? h("span", { key: `ellipsis-${i}`, class: "ellipsis", "aria-hidden": "true" }, "\u2026")
            : (h("button", { key: page, type: "button", class: { 'page-btn': true, 'active': page === this.currentPage }, "aria-label": `Go to page ${page}`, "aria-current": page === this.currentPage ? 'page' : null, onClick: () => this.go(page) }, page))), h("button", { key: 'cf1fa26bf92af21bce43b8293e3a035f1c0e4fe2', type: "button", class: "page-btn nav-btn", "aria-label": "Go to next page", disabled: isLast, "aria-disabled": isLast ? 'true' : null, onClick: () => this.go(this.currentPage + 1) }, h("svg", { key: '5039728da020dc1a91be23a45165532035d9b7d6', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '3c0cdec271bb34531e32a200baa48c1862d46e59', d: "M9 18l6-6-6-6" }))))));
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
