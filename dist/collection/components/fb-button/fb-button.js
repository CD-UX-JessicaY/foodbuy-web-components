import { h, Host } from "@stencil/core";
export class FbButton {
    constructor() {
        /** Visual style of the button */
        this.variant = 'default';
        /** Size of the button */
        this.size = 'default';
        /** Position of the icon slot relative to the label */
        this.iconPosition = 'none';
        /** Full pill / circle border radius */
        this.rounded = false;
        /** Disables the button */
        this.disabled = false;
        /** HTML type attribute */
        this.type = 'button';
        this.handleClick = () => {
            if (!this.disabled) {
                this.fbClick.emit();
            }
        };
    }
    render() {
        const isIconOnly = this.iconPosition === 'only';
        return (h(Host, { key: 'd4f8e201c848cf5112a1424bf02790f8b49a746b' }, h("button", { key: 'f1756037c4904308387e6f76cc319d3658d0bab1', type: this.type, disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : null, "aria-label": isIconOnly && this.label ? this.label : null, class: {
                'fb-button': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'rounded': this.rounded,
                'icon-only': isIconOnly,
                'disabled': this.disabled,
            }, onClick: this.handleClick }, this.iconPosition === 'left' && (h("span", { key: 'dc97ee4e4f6d77d98c77f5b61c6f704247f68448', class: "icon icon--left", "aria-hidden": "true" }, h("slot", { key: 'b083a00b7382530c8a38ebcdef836d7212aaa61c', name: "icon-left" }))), !isIconOnly && (h("span", { key: 'a8ffbc605f07f05bd6cabde8711cb68241d2cca4', class: "label" }, h("slot", { key: '0cd018706421ce289992e8f3c15324f771a05e8f' }))), this.iconPosition === 'right' && (h("span", { key: '2359d02779234c8a2270645fa23b9a5b4a250609', class: "icon icon--right", "aria-hidden": "true" }, h("slot", { key: 'b24e38061776426f8900076a3821bbbf8b67c640', name: "icon-right" }))), isIconOnly && (h("span", { key: '22a9789089043614219cec949b75f9a487cbc291', class: "icon icon--only", "aria-hidden": "true" }, h("slot", { key: '63f262ad829dce18b6a1dc1a47fefbf142e3bf7a', name: "icon" }))))));
    }
    static get is() { return "fb-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-button.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-button.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "ButtonVariant",
                    "resolved": "\"default\" | \"destructive\" | \"ghost\" | \"link\" | \"outline\" | \"secondary\"",
                    "references": {
                        "ButtonVariant": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-button/fb-button.tsx",
                            "id": "src/components/fb-button/fb-button.tsx::ButtonVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Visual style of the button"
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
                    "original": "ButtonSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\" | \"xs\"",
                    "references": {
                        "ButtonSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-button/fb-button.tsx",
                            "id": "src/components/fb-button/fb-button.tsx::ButtonSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Size of the button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "size",
                "defaultValue": "'default'"
            },
            "iconPosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "IconPosition",
                    "resolved": "\"left\" | \"none\" | \"only\" | \"right\"",
                    "references": {
                        "IconPosition": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-button/fb-button.tsx",
                            "id": "src/components/fb-button/fb-button.tsx::IconPosition"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Position of the icon slot relative to the label"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "icon-position",
                "defaultValue": "'none'"
            },
            "rounded": {
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
                    "text": "Full pill / circle border radius"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "rounded",
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
                    "text": "Disables the button"
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
                    "text": "Accessible label \u2014 required when iconPosition=\"only\".\nFor buttons with visible text this is set automatically from slot content,\nbut icon-only buttons have no visible text so this must be provided."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label"
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'button' | 'submit' | 'reset'",
                    "resolved": "\"button\" | \"reset\" | \"submit\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "HTML type attribute"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "type",
                "defaultValue": "'button'"
            }
        };
    }
    static get events() {
        return [{
                "method": "fbClick",
                "name": "fbClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the button is clicked (not fired when disabled)"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
