import { h, Host } from "@stencil/core";
export class FbToggle {
    constructor() {
        this.variant = 'default';
        this.size = 'default';
        this.pressed = false;
        this.disabled = false;
        this.handleClick = () => {
            if (this.disabled)
                return;
            this.pressed = !this.pressed;
            this.fbPressedChange.emit(this.pressed);
        };
    }
    render() {
        return (h(Host, { key: '2c2fc466f5bc90a2c2271d281e4e062c64e80a83' }, h("button", { key: '29594481a1d493136eee02d057451bad61c4b89b', type: "button", class: {
                'fb-toggle': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'pressed': this.pressed,
                'disabled': this.disabled,
            }, "aria-pressed": String(this.pressed), "aria-label": this.label || null, disabled: this.disabled, onClick: this.handleClick }, h("slot", { key: 'c431c273a3473a9c3616a2c4b5c1a25d8a7f357d' }))));
    }
    static get is() { return "fb-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-toggle.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-toggle.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ToggleVariant",
                    "resolved": "\"default\" | \"outline\"",
                    "references": {
                        "ToggleVariant": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-toggle/fb-toggle.tsx",
                            "id": "src/components/fb-toggle/fb-toggle.tsx::ToggleVariant"
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
                    "original": "ToggleSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "ToggleSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-toggle/fb-toggle.tsx",
                            "id": "src/components/fb-toggle/fb-toggle.tsx::ToggleSize"
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
            "pressed": {
                "type": "boolean",
                "mutable": true,
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
                "attribute": "pressed",
                "defaultValue": "false"
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
                    "text": "aria-label \u2014 required for icon-only toggles"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label"
            }
        };
    }
    static get events() {
        return [{
                "method": "fbPressedChange",
                "name": "fbPressedChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
}
