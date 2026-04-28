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
        return (h(Host, { key: 'f8ea5664986b6bc9cece03a2c60a1906212efb43' }, h("nav", { key: '2e01578113862d27ec57105388f2f1e73a212bd3', "aria-label": this.label, class: "fb-pagination" }, h("button", { key: 'aef57c6a375fa5b0a250acf6840191cdfa79aa89', type: "button", class: "page-btn nav-btn", "aria-label": "Go to previous page", disabled: isFirst, "aria-disabled": isFirst ? 'true' : null, onClick: () => this.go(this.currentPage - 1) }, h("svg", { key: '2a6a4f6b075953c687e337c9b306b7bc3d4590bd', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: 'f4d26dafed31f16873158d6603234209d16c23f8', d: "M15 18l-6-6 6-6" }))), pages.map((page, i) => page === '...'
            ? h("span", { key: `ellipsis-${i}`, class: "ellipsis", "aria-hidden": "true" }, "\u2026")
            : (h("button", { key: page, type: "button", class: { 'page-btn': true, 'active': page === this.currentPage }, "aria-label": `Go to page ${page}`, "aria-current": page === this.currentPage ? 'page' : null, onClick: () => this.go(page) }, page))), h("button", { key: '121ef94bfe9a61dca98cfab66966fa5be8932650', type: "button", class: "page-btn nav-btn", "aria-label": "Go to next page", disabled: isLast, "aria-disabled": isLast ? 'true' : null, onClick: () => this.go(this.currentPage + 1) }, h("svg", { key: '204e0df48e11423af8a8e968f9c28345b7ead202', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '282c982e1526bcf9f34e45e414bd3ff31e5ebb15', d: "M9 18l6-6-6-6" }))))));
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
