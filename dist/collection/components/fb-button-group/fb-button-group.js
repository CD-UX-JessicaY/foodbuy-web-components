import { h, Host } from "@stencil/core";
export class FbButtonGroup {
    constructor() {
        this.orientation = 'horizontal';
    }
    componentDidLoad() {
        var _a;
        const slot = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        slot === null || slot === void 0 ? void 0 : slot.addEventListener('slotchange', () => this.applyToButtons());
        this.applyToButtons();
    }
    applyToButtons() {
        const buttons = Array.from(this.el.querySelectorAll('fb-button'));
        if (!buttons.length)
            return;
        const isVertical = this.orientation === 'vertical';
        const last = buttons.length - 1;
        buttons.forEach((btn, i) => {
            const isFirst = i === 0;
            const isLast = i === last;
            const isOnly = buttons.length === 1;
            let radius;
            if (isOnly) {
                radius = 'var(--radius-sm)';
            }
            else if (isVertical) {
                if (isFirst)
                    radius = 'var(--radius-sm) var(--radius-sm) 0 0';
                else if (isLast)
                    radius = '0 0 var(--radius-sm) var(--radius-sm)';
                else
                    radius = '0';
            }
            else {
                if (isFirst)
                    radius = 'var(--radius-sm) 0 0 var(--radius-sm)';
                else if (isLast)
                    radius = '0 var(--radius-sm) var(--radius-sm) 0';
                else
                    radius = '0';
            }
            btn.style.setProperty('--fb-button-radius', radius);
            if (isVertical) {
                btn.style.removeProperty('margin-left');
                btn.style.setProperty('margin-top', isFirst ? '0' : '-1px');
            }
            else {
                btn.style.removeProperty('margin-top');
                btn.style.setProperty('margin-left', isFirst ? '0' : '-1px');
            }
            if (this.variant)
                btn.variant = this.variant;
            if (this.size)
                btn.size = this.size;
        });
    }
    render() {
        var _a;
        return (h(Host, { key: '5c601bb732ee6eaa7d0a686ff3ed1ec720f59392' }, h("div", { key: '2128b5e8a21d74c6a1a175dea0c59667d226a632', role: "group", "aria-label": (_a = this.el.getAttribute('aria-label')) !== null && _a !== void 0 ? _a : 'Button group', class: { 'fb-button-group': true, 'vertical': this.orientation === 'vertical' } }, h("slot", { key: '4ce9420372bebd644c40a9caa176fa8bf8a236ad' }))));
    }
    static get is() { return "fb-button-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-button-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-button-group.css"]
        };
    }
    static get properties() {
        return {
            "orientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "GroupOrientation",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {
                        "GroupOrientation": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-button-group/fb-button-group.tsx",
                            "id": "src/components/fb-button-group/fb-button-group.tsx::GroupOrientation"
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
            "variant": {
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
                "attribute": "variant"
            },
            "size": {
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
                "attribute": "size"
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "orientation",
                "methodName": "applyToButtons"
            }, {
                "propName": "variant",
                "methodName": "applyToButtons"
            }, {
                "propName": "size",
                "methodName": "applyToButtons"
            }];
    }
}
