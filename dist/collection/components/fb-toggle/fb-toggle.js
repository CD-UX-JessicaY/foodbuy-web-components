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
        return (h(Host, { key: '5d168572ca08774f570e12c23c4d6fcd73494faa' }, h("button", { key: '7e626200b3bf372c8a8c328f23ea5444791f85e2', type: "button", class: {
                'fb-toggle': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'pressed': this.pressed,
                'disabled': this.disabled,
            }, "aria-pressed": String(this.pressed), "aria-label": this.label || null, disabled: this.disabled, onClick: this.handleClick }, h("slot", { key: '1b349826660350eb514b68f090935f366102e335' }))));
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
