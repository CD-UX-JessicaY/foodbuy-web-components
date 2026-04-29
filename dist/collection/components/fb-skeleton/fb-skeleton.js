import { h, Host } from "@stencil/core";
export class FbSkeleton {
    constructor() {
        /** Shape of the skeleton placeholder */
        this.variant = 'text';
        /** Width — any CSS value e.g. "200px", "100%", "12rem" */
        this.width = '100%';
    }
    render() {
        const style = {
            width: this.width,
            height: this.height || (this.variant === 'text' ? '1em' : this.variant === 'circle' ? this.width : '80px'),
        };
        return (h(Host, { key: '3b6e25acdc3bd3b6a8952aa85745d622b23e3741' }, h("span", { key: 'b5a5a517b82211e59209512f5b6c2dc8f8d8dfce', "aria-hidden": "true", class: { 'fb-skeleton': true, [`variant-${this.variant}`]: true }, style: style })));
    }
    static get is() { return "fb-skeleton"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-skeleton.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-skeleton.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "SkeletonVariant",
                    "resolved": "\"circle\" | \"rect\" | \"text\"",
                    "references": {
                        "SkeletonVariant": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-skeleton/fb-skeleton.tsx",
                            "id": "src/components/fb-skeleton/fb-skeleton.tsx::SkeletonVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Shape of the skeleton placeholder"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "variant",
                "defaultValue": "'text'"
            },
            "width": {
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
                    "text": "Width \u2014 any CSS value e.g. \"200px\", \"100%\", \"12rem\""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "width",
                "defaultValue": "'100%'"
            },
            "height": {
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
                    "text": "Height \u2014 any CSS value"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "height"
            }
        };
    }
}
