import { r as registerInstance, c as createEvent, h, H as Host } from './index-CUJsYiXU.js';

const fbToggleGroupCss = () => `:host{display:inline-flex}.fb-toggle-group{display:inline-flex;flex-direction:row;align-items:center}.fb-toggle-group.vertical{flex-direction:column;align-items:stretch}.variant-default{background:var(--color-neutral-100);border-radius:var(--radius-sm);padding:3px;gap:2px}.variant-outline{background:transparent}.item{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-8);font-family:var(--font-family-primary);font-weight:var(--font-weight-medium);cursor:pointer;transition:background 0.15s, color 0.15s, border-color 0.15s;user-select:none;flex-shrink:0;outline:none;box-sizing:border-box;position:relative}.item:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:0;z-index:2}.size-sm .item{height:26px;padding:0 var(--spacing-8);font-size:var(--font-size-12)}.size-default .item{height:34px;padding:0 var(--spacing-12);font-size:var(--font-size-14)}.size-lg .item{height:42px;padding:0 var(--spacing-16);font-size:var(--font-size-16)}.variant-default .item{border:none;border-radius:var(--radius-xs);background:transparent;color:var(--color-neutral-600)}.variant-default .item:hover:not(.disabled){background:var(--color-neutral-white);color:var(--color-neutral-700)}.variant-default .item.pressed{background:var(--color-neutral-white);color:var(--color-primary-600);box-shadow:0 1px 3px rgba(0,0,0,0.1)}.variant-outline .item{background:var(--color-neutral-white);color:var(--color-neutral-600);border:1px solid var(--color-neutral-300)}.variant-outline .item:hover:not(.disabled){background:var(--color-neutral-50)}.variant-outline .item.pressed{background:var(--color-primary-50);color:var(--color-primary-600);border-color:var(--color-primary-500);z-index:1}.item.disabled{opacity:0.5;cursor:not-allowed;pointer-events:none}`;

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
const FbToggleGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
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
        return (h(Host, { key: 'fd83bef24633f7874de1b2d6b8f238cf711a669b' }, h("div", { key: '907fd7aef1f11a5d323c20890fac83a082ac23f6', role: "group", "aria-label": this.label, "aria-disabled": this.disabled ? 'true' : null, class: {
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
    static get watchers() { return {
        "value": [{
                "onValueChange": 0
            }]
    }; }
};
FbToggleGroup.style = fbToggleGroupCss();

export { FbToggleGroup as fb_toggle_group };
