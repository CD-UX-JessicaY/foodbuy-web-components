import { h, Host } from "@stencil/core";
export class FbChip {
    constructor() {
        this.label = '';
        this.variant = 'default';
        this.size = 'default';
        /** Makes the chip selectable (toggle). Uses role="option" + aria-selected. */
        this.selectable = false;
        this.selected = false;
        /** Shows a remove (×) button. Emits fbRemove. */
        this.dismissible = false;
        this.disabled = false;
    }
    handleClick() {
        if (this.disabled || !this.selectable)
            return;
        this.selected = !this.selected;
        this.fbSelect.emit(this.selected);
    }
    render() {
        const classes = {
            'fb-chip': true,
            [`fb-chip--${this.variant}`]: true,
            [`fb-chip--${this.size}`]: true,
            'fb-chip--selected': this.selected,
            'fb-chip--disabled': this.disabled,
        };
        if (this.selectable) {
            return (h(Host, null, h("button", { type: "button", role: "option", "aria-selected": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : null, disabled: this.disabled, class: classes, onClick: () => this.handleClick() }, h("slot", { name: "icon-left" }), h("span", { class: "fb-chip__label" }, this.label, h("slot", null)), this.dismissible && (h("span", { role: "button", "aria-label": `Remove ${this.label}`, tabindex: this.disabled ? -1 : 0, class: "fb-chip__remove", onClick: (e) => {
                    e.stopPropagation();
                    if (!this.disabled)
                        this.fbRemove.emit();
                }, onKeyDown: (e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.fbRemove.emit();
                    }
                } }, h("svg", { "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M18 6L6 18M6 6l12 12" })))))));
        }
        return (h(Host, null, h("span", { class: classes, "aria-disabled": this.disabled ? 'true' : null }, h("slot", { name: "icon-left" }), h("span", { class: "fb-chip__label" }, this.label, h("slot", null)), this.dismissible && (h("button", { type: "button", "aria-label": `Remove ${this.label}`, disabled: this.disabled, class: "fb-chip__remove", onClick: () => {
                if (!this.disabled)
                    this.fbRemove.emit();
            } }, h("svg", { "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M18 6L6 18M6 6l12 12" })))))));
    }
    static get is() { return "fb-chip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-chip.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-chip.css"]
        };
    }
    static get properties() {
        return {
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
                "defaultValue": "''"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'default' | 'primary' | 'success' | 'warning' | 'danger'",
                    "resolved": "\"danger\" | \"default\" | \"primary\" | \"success\" | \"warning\"",
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
                "attribute": "variant",
                "defaultValue": "'default'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'sm' | 'default'",
                    "resolved": "\"default\" | \"sm\"",
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
                "attribute": "size",
                "defaultValue": "'default'"
            },
            "selectable": {
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
                    "text": "Makes the chip selectable (toggle). Uses role=\"option\" + aria-selected."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "selectable",
                "defaultValue": "false"
            },
            "selected": {
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
                "reflect": false,
                "attribute": "selected",
                "defaultValue": "false"
            },
            "dismissible": {
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
                    "text": "Shows a remove (\u00D7) button. Emits fbRemove."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "dismissible",
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
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "fbSelect",
                "name": "fbSelect",
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
            }, {
                "method": "fbRemove",
                "name": "fbRemove",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
