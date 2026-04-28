import { h, Host } from "@stencil/core";
export class FbBadge {
    constructor() {
        /** Visual style */
        this.variant = 'default';
        /** Size */
        this.size = 'default';
        /**
         * Show a dot indicator instead of text.
         * When true, provide a label prop for screen readers — the dot conveys
         * meaning through colour alone which is a WCAG failure without a text alternative.
         */
        this.dot = false;
    }
    render() {
        const isDot = this.dot;
        return (h(Host, { key: '4c965685d99e0af592b690c2039783e4e62045d1' }, h("span", { key: 'a258fc4d7058299cd8a26ba156516dd4a6b1bb51', class: {
                'fb-badge': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'dot': isDot,
            }, "aria-label": isDot && this.label ? this.label : null, role: isDot ? 'img' : null }, isDot ? null : (this.label || h("slot", null)))));
    }
    static get is() { return "fb-badge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-badge.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-badge.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "BadgeVariant",
                    "resolved": "\"danger\" | \"default\" | \"info\" | \"neutral\" | \"success\" | \"warning\"",
                    "references": {
                        "BadgeVariant": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-badge/fb-badge.tsx",
                            "id": "src/components/fb-badge/fb-badge.tsx::BadgeVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Visual style"
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
                    "original": "BadgeSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "BadgeSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-badge/fb-badge.tsx",
                            "id": "src/components/fb-badge/fb-badge.tsx::BadgeSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Size"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "size",
                "defaultValue": "'default'"
            },
            "dot": {
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
                    "text": "Show a dot indicator instead of text.\nWhen true, provide a label prop for screen readers \u2014 the dot conveys\nmeaning through colour alone which is a WCAG failure without a text alternative."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "dot",
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
                    "text": "Visible label text (also used as aria-label for dot variant)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label"
            }
        };
    }
}
