import { h, Host } from "@stencil/core";
// Built-in icon set
const ICONS = {
    bold: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M4 3h5a2.5 2.5 0 0 1 0 5H4V3z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), h("path", { d: "M4 8h5.5a2.5 2.5 0 0 1 0 5H4V8z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" })),
    italic: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M7 3h5M4 13h5M9 3l-2 10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    underline: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M4 3v5a4 4 0 0 0 8 0V3", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("path", { d: "M3 13h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-left': () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M2 4h12M2 8h8M2 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-center': () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M2 4h12M4 8h8M3 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-right': () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M2 4h12M6 8h8M4 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    grid: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("rect", { x: "2", y: "2", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), h("rect", { x: "9", y: "2", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), h("rect", { x: "2", y: "9", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), h("rect", { x: "9", y: "9", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" })),
    list: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M3 4h10M3 8h10M3 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
};
export class FbToggleGroup {
    constructor() {
        this.type = 'single';
        this.variant = 'default';
        this.size = 'default';
        this.orientation = 'horizontal';
        this.disabled = false;
        this.label = 'Toggle group';
        /** JSON array of { value, label?, icon?, disabled? } */
        this.items = '[]';
        /** Current selection — string for single, JSON array for multiple */
        this.value = '';
        this.selected = new Set();
    }
    componentWillLoad() {
        this.initSelection();
    }
    onValueChange() {
        this.initSelection();
    }
    initSelection() {
        if (!this.value) {
            this.selected = new Set();
            return;
        }
        if (this.type === 'multiple') {
            try {
                this.selected = new Set(JSON.parse(this.value));
            }
            catch (_a) {
                this.selected = new Set();
            }
        }
        else {
            this.selected = new Set([this.value]);
        }
    }
    parsedItems() {
        try {
            return JSON.parse(this.items);
        }
        catch (_a) {
            return [];
        }
    }
    toggle(val) {
        if (this.disabled)
            return;
        const next = new Set(this.selected);
        if (this.type === 'single') {
            if (next.has(val))
                next.delete(val);
            else {
                next.clear();
                next.add(val);
            }
            this.selected = next;
            this.value = next.has(val) ? val : '';
            this.fbChange.emit(this.value);
        }
        else {
            if (next.has(val))
                next.delete(val);
            else
                next.add(val);
            this.selected = next;
            const arr = Array.from(next);
            this.value = JSON.stringify(arr);
            this.fbChange.emit(arr);
        }
    }
    borderRadius(isFirst, isLast) {
        const r = 'var(--radius-sm)';
        const isV = this.orientation === 'vertical';
        if (isFirst && isLast)
            return r;
        if (isV) {
            if (isFirst)
                return `${r} ${r} 0 0`;
            if (isLast)
                return `0 0 ${r} ${r}`;
            return '0';
        }
        if (isFirst)
            return `${r} 0 0 ${r}`;
        if (isLast)
            return `0 ${r} ${r} 0`;
        return '0';
    }
    render() {
        const items = this.parsedItems();
        const isOutline = this.variant === 'outline';
        const isV = this.orientation === 'vertical';
        const last = items.length - 1;
        return (h(Host, { key: '6b0b1f2ef911b8e967cda12c033bfc024e9e46c1' }, h("div", { key: 'a80543f0aa0dd1766b99f8a007fcefa798ad6bd7', role: "group", "aria-label": this.label, "aria-disabled": this.disabled ? 'true' : null, class: {
                'fb-toggle-group': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'vertical': isV,
            } }, items.map((item, i) => {
            const pressed = this.selected.has(item.value);
            const isDisabled = this.disabled || !!item.disabled;
            const isFirst = i === 0;
            const isLast = i === last;
            const icon = item.icon && ICONS[item.icon] ? ICONS[item.icon]() : null;
            return (h("button", { key: item.value, type: "button", role: "button", "aria-pressed": String(pressed), "aria-label": !item.label ? item.value : null, disabled: isDisabled, class: {
                    'item': true,
                    'pressed': pressed,
                    'disabled': isDisabled,
                    'first': isFirst,
                    'last': isLast,
                }, style: isOutline ? {
                    borderRadius: this.borderRadius(isFirst, isLast),
                    marginLeft: (!isV && !isFirst) ? '-1px' : null,
                    marginTop: (isV && !isFirst) ? '-1px' : null,
                } : {}, onClick: () => this.toggle(item.value) }, icon, item.label && h("span", null, item.label)));
        }))));
    }
    static get is() { return "fb-toggle-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-toggle-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-toggle-group.css"]
        };
    }
    static get properties() {
        return {
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ToggleGroupType",
                    "resolved": "\"multiple\" | \"single\"",
                    "references": {
                        "ToggleGroupType": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-toggle-group/fb-toggle-group.tsx",
                            "id": "src/components/fb-toggle-group/fb-toggle-group.tsx::ToggleGroupType"
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
                "attribute": "type",
                "defaultValue": "'single'"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ToggleGroupVariant",
                    "resolved": "\"default\" | \"outline\"",
                    "references": {
                        "ToggleGroupVariant": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-toggle-group/fb-toggle-group.tsx",
                            "id": "src/components/fb-toggle-group/fb-toggle-group.tsx::ToggleGroupVariant"
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
                "defaultValue": "'default'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ToggleGroupSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "ToggleGroupSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-toggle-group/fb-toggle-group.tsx",
                            "id": "src/components/fb-toggle-group/fb-toggle-group.tsx::ToggleGroupSize"
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
            "orientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ToggleGroupOrientation",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {
                        "ToggleGroupOrientation": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-toggle-group/fb-toggle-group.tsx",
                            "id": "src/components/fb-toggle-group/fb-toggle-group.tsx::ToggleGroupOrientation"
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
                "attribute": "orientation",
                "defaultValue": "'horizontal'"
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
                "reflect": true,
                "attribute": "disabled",
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
                "defaultValue": "'Toggle group'"
            },
            "items": {
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
                    "text": "JSON array of { value, label?, icon?, disabled? }"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "items",
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
                    "text": "Current selection \u2014 string for single, JSON array for multiple"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value",
                "defaultValue": "''"
            }
        };
    }
    static get states() {
        return {
            "selected": {}
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
                    "text": ""
                },
                "complexType": {
                    "original": "string | string[]",
                    "resolved": "string | string[]",
                    "references": {}
                }
            }];
    }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "onValueChange"
            }];
    }
}
