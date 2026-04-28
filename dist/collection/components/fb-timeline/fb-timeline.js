import { h, Host } from "@stencil/core";
export class FbTimeline {
    constructor() {
        this.items = '[]';
        this.label = 'Timeline';
        this.orientation = 'vertical';
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
    statusIcon(status) {
        if (status === 'complete') {
            return (h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M20 6L9 17l-5-5" })));
        }
        if (status === 'active') {
            return h("span", { class: "fb-timeline__dot-inner" });
        }
        return null;
    }
    render() {
        const items = this.parsedItems;
        return (h(Host, { key: '1eed34c9e14569dfa362dae454327c007ad06422' }, h("ol", { key: 'e5c78e16827cdfcd96e500c5099b18498ff76daa', "aria-label": this.label, class: `fb-timeline fb-timeline--${this.orientation}` }, items.map((item, i) => {
            var _a, _b, _c;
            return (h("li", { key: item.id, class: {
                    'fb-timeline__item': true,
                    [`fb-timeline__item--${(_a = item.status) !== null && _a !== void 0 ? _a : 'pending'}`]: true,
                    'fb-timeline__item--last': i === items.length - 1,
                } }, h("div", { class: "fb-timeline__indicator", "aria-hidden": "true" }, h("span", { class: `fb-timeline__dot fb-timeline__dot--${(_b = item.status) !== null && _b !== void 0 ? _b : 'pending'}` }, this.statusIcon((_c = item.status) !== null && _c !== void 0 ? _c : 'pending')), i < items.length - 1 && h("span", { class: "fb-timeline__line" })), h("div", { class: "fb-timeline__content" }, item.timestamp && (h("time", { class: "fb-timeline__timestamp" }, item.timestamp)), h("p", { class: "fb-timeline__title" }, item.title), item.description && (h("p", { class: "fb-timeline__description" }, item.description)))));
        }))));
    }
    static get is() { return "fb-timeline"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-timeline.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-timeline.css"]
        };
    }
    static get properties() {
        return {
            "items": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TimelineItem[] | string",
                    "resolved": "TimelineItem[] | string",
                    "references": {
                        "TimelineItem": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-timeline/fb-timeline.tsx",
                            "id": "src/components/fb-timeline/fb-timeline.tsx::TimelineItem"
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
                "defaultValue": "'Timeline'"
            },
            "orientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'vertical' | 'horizontal'",
                    "resolved": "\"horizontal\" | \"vertical\"",
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
                "attribute": "orientation",
                "defaultValue": "'vertical'"
            }
        };
    }
}
